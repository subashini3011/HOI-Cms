import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { pageRefreshing } from "../../redux/actions/nonApiActions";

import StatisticCardContainer from "containers/statistic-card";
import { uploadFile } from "../../redux/actions/uploadFileActions";

import StoresOfferForm from "components/forms/stores-offer-form";
import CommonTable from "components/commonTable";
import Loading from "components/loading";
import FileUpload from "components/file-upload";
import TableOperations from "components/tableOperations";
import { message, Icon, Tag, Popconfirm, Upload, Button } from "components/ui";

import {
  getStoresOffer,
  deleteStoresOffer,
  uploadRedeem,
  uploadBarcode
} from "../../redux/actions/storesOfferActions";
import { UPLOAD_BARCODE, UPLOAD_REDEEM } from "constants/api-constants";
import { UPLOAD_FILE } from "constants/api-constants";

import "./index.scss";

class StoresOffer extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      storesOfferFields: [],
      selectedAirport,
      isAddStoresOfferForm: false,
      columns: "",
      searchKey: "",
      isAddStoresOfferForm: false,
      isEditStoresOfferForm: false,
      editRecordData: [],
      pageNumber: 1,
      offset: 6,
      searchKey: "",
      totalData: "",
      filterKeys: [
        "description",
        "logo",
        "id",
        "status",
        "image",
        "title",
        "Action"
      ],
      isDisableBarcodeFileUpload: false,
      isDisableRedeemFileUpload: false
    };
  }

  componentDidMount() {
    const { getStoresOffer, selectedAirport } = this.props;
    const storesOfferPayload = {
      airport_code: selectedAirport,
      page_no: 1,
      offset: 6,
      search_key: ""
    };

    getStoresOffer(storesOfferPayload);
  }

  componentWillReceiveProps(nextProps) {
    const { deleteStoresOfferResponse, pageRefreshingResponse } = this.props;
    const { pageNumber, offset, searchKey } = this.state;

    if (
      nextProps.getStoresOfferResponse &&
      nextProps.getStoresOfferResponse !== this.props.getStoresOfferResponse
    ) {
      if (
        nextProps.getStoresOfferResponse.error === 0 &&
        nextProps.getStoresOfferResponse.content
      ) {
        // const data = nextProps.getStoresOfferResponse.content.find(
        //   dataItem => dataItem.airport_code === this.state.selectedAirport
        // );

        this.handleTableData(nextProps.getStoresOfferResponse.content);
      }
    }
    if (
      nextProps.deleteStoresOfferResponse &&
      nextProps.deleteStoresOfferResponse !== deleteStoresOfferResponse
    ) {
      if (
        nextProps.deleteStoresOfferResponse.error === 0 &&
        nextProps.deleteStoresOfferResponse.message
      ) {
        const { getStoresOffer, selectedAirport } = this.props;
        const storesOfferPayload = {
          airport_code: selectedAirport,
          page_no: pageNumber,
          offset,
          search_key: searchKey
        };
        message.success(nextProps.deleteStoresOfferResponse.message);

        getStoresOffer(storesOfferPayload);
      } else {
        message.error(nextProps.deleteStoresOfferResponse.message);
      }
    }

    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        const { userInfo } = this.state;
        const data = {
          page_no: 1,
          offset: 6,
          search_key: ""
        };
        const filterKeys = [
          "description",
          "logo",
          "id",
          "status",
          "image",
          "title",
          "Action"
        ];
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,

          filterKeys,
          isAddStoresOfferForm: false,
          isEditStoresOfferForm: false
        });

        const { getStoresOffer, selectedAirport } = this.props;
        const storesOfferPayload = {
          airport_code: selectedAirport,
          page_no: 1,
          offset: 6,
          search_key: ""
        };

        getStoresOffer(storesOfferPayload);
      }
    }

    if (
      nextProps.uploadBarcodeResponse &&
      nextProps.uploadBarcodeResponse !== this.props.uploadBarcodeResponse
    ) {
      if (
        nextProps.uploadBarcodeResponse.error === 0 &&
        nextProps.uploadBarcodeResponse.content &&
        nextProps.uploadBarcodeResponse.content.image_url
      ) {
        message.success("Image Uploaded successfully");
        // this.setState({
        //   uploadProfileImageUrl: nextProps.uploadBarcodeResponse.content.image_url,
        //   isSaveButtonDisabled: false
        // });
      } else {
        message.error("Error in Upload. Please try again..");
      }
    }

    if (
      nextProps.uploadRedeemResponse &&
      nextProps.uploadRedeemResponse !== this.props.uploadRedeemResponse
    ) {
      if (
        nextProps.uploadRedeemResponse.error === 0 &&
        nextProps.uploadRedeemResponse.content &&
        nextProps.uploadRedeemResponse.content.image_url
      ) {
        message.success("Image Uploaded successfully");
        // this.setState({
        //   uploadProfileImageUrl: nextProps.uploadRedeemResponse.content.image_url,
        //   isSaveButtonDisabled: false
        // });
      } else {
        message.error("Error in Upload. Please try again..");
      }
    }

    if (
      nextProps.uploadFileResponse &&
      nextProps.uploadFileResponse !== this.props.uploadFileResponse
    ) {
      if (
        nextProps.uploadFileResponse.error === 0 &&
        nextProps.uploadFileResponse.message
      ) {
        message.success(nextProps.uploadFileResponse.message);
      } else if (
        nextProps.uploadFileResponse.error === 1 &&
        nextProps.uploadFileResponse.message
      ) {
        message.error(nextProps.uploadFileResponse.message);
      }
    }
  }

  onBarcodeFileBeforeUpload = (fieldInfo, info, record) => {
    const formData = new FormData();
    formData.append("fileUpload", info);
    formData.append("offer_id", record.id);
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_BARCODE
    });
  };

  // onBarcodeFileBeforeUpload = (fieldInfo, info, record) => {
  //   const formData = new FormData();
  //   formData.append('fileUpload', info);
  //   formData.append('offer_id', record.id);

  //   this.setState({
  //     isDisableBarcodeFileUpload: true
  //   });
  //   console.log(record.id);
  //   debugger;
  //   this.props.uploadBarcode({
  //     // fileUpload: info,
  //     // offer_id: record.id
  //     // url: UPLOAD_FILE
  //     formData
  //   });
  // };

  onBarcodeFileRemove = () => {
    message.success("Removed successfully");
    // this.setState({
    //   isDisableBarcodeFileUpload: false
    //   // uploadProfileImageUrl: ''
    // });
  };

  onRedeemFileBeforeUpload = (fieldInfo, info, record) => {
    const formData = new FormData();
    formData.append("fileUpload", info);
    formData.append("offer_id", record.id);
    this.props.uploadFile({
      data: formData,
      url: UPLOAD_REDEEM
    });
  };

  onRedeemFileRemove = () => {
    message.success("Removed successfully");
    // this.setState({
    //   isDisableRedeemFileUpload: false
    //   // uploadProfileImageUrl: ''
    // });
  };

  handleTableData = response => {
    const tableData = response.data;
    const dynamicColumns = [];

    if (response.data.length > 0) {
      dynamicColumns.push(
        Object.getOwnPropertyNames(response.data[0]).map(item => {
          let header = [];
          if (item === "image" || item === "logo") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text => (
                <img
                  src={text}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    marginLeft: "1.7rem"
                  }}
                  alt={item}
                />
              )
            };
          } else if (item === "is_map_support") {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`,
              render: text =>
                text === 1 ? (
                  <span className="cmsusers__table__status__active">Yes</span>
                ) : (
                  <span className="cmsusers__table__status__inactive">No</span>
                )
            };
          } else {
            header = {
              title: `${item}`.replace(/_/g, " "),
              dataIndex: `${item}`,
              key: `${item}`
            };
          }
          return header;
        })
      );
      const actions = {
        title: "Action",
        dataIndex: "Action",
        width: "15rem",
        render: (text, record) => (
          <span className="u_no_wrap">
            <Tag
              color="geekblue"
              style={{ marginRight: "1rem" }}
              onClick={e => {
                this.handleEdit(e, record);
              }}
              className="u_cursor_pointer"
            >
              Edit
            </Tag>
            <Popconfirm
              placement="topRight"
              title="Are you sure delete this record?"
              icon={<Icon type="exclamation-circle" style={{ color: "red" }} />}
              onConfirm={e => {
                this.handleDelete(e, record);
              }}
              okText="Yes"
              cancelText="No"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Tag color="volcano" className="u_cursor_pointer">
                Delete
              </Tag>
            </Popconfirm>
            <div className="storesOffer__upload-btn u_display_flex u_margin_top_10 ">
              <div className="storesOffer__barcode-upload">
                <FileUpload
                  uploadName="Barcode"
                  label="Barcode"
                  value=""
                  record={record}
                  onImageBeforeUpload={this.onBarcodeFileBeforeUpload}
                  onRemove={this.onBarcodeFileRemove}
                />
              </div>

              <FileUpload
                uploadName="Redeem"
                label="Redeem"
                value=""
                record={record}
                onImageBeforeUpload={this.onRedeemFileBeforeUpload}
                onRemove={this.onRedeemFileRemove}
              />
            </div>
          </span>
        )
      };
      dynamicColumns[0].push(actions);

      this.setState({
        tableData,
        columns: dynamicColumns[0],
        totalData: response.total_item,
        isLoading: false
      });
    } else {
      this.setState({
        tableData: [],
        columns: [],
        totalData: response.total_item,
        isLoading: false
      });
    }
    this.props.pageRefreshing({ isLoading: false });
  };

  onApplyFilter = filterKeys => {
    this.setState({ filterKeys });
  };

  onAddNewClick = () => {
    this.setState({ isAddStoresOfferForm: true });
  };

  handleEdit = (e, record) => {
    e.stopPropagation();
    this.setState({ isEditStoresOfferForm: true, editRecordData: record });
  };

  handleDelete = (e, record) => {
    e.stopPropagation();
    const data = {
      store_id: record.id
    };
    this.props.deleteStoresOffer(data);
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({
      isAddStoresOfferForm: false,
      isEditStoresOfferForm: false
    });
  };

  toggleForm = () => {
    const { selectedAirport, pageNumber, offset, searchKey } = this.state;
    const { getStoresOffer } = this.props;
    if (this.state.isEditStoresOfferForm) {
      this.setState({ isEditStoresOfferForm: false });
      const storesOfferPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      getStoresOffer(storesOfferPayload);
    } else if (this.state.isAddStoresOfferForm) {
      this.setState({
        isAddStoresOfferForm: false
      });
      const storesOfferPayload = {
        airport_code: selectedAirport,
        page_no: pageNumber,
        offset,
        search_key: searchKey
      };
      getStoresOffer(storesOfferPayload);
    }
  };

  onOffsetChange = offset => {
    const { totalData, searchKey } = this.state;
    const { getStoresOffer, selectedAirport } = this.props;
    let { pageNumber } = this.state;
    // checking the page number if it is greater than the number of pages
    if (pageNumber > Math.ceil(totalData / offset)) {
      pageNumber = Math.ceil(totalData / offset);
    }

    const storesOfferPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    getStoresOffer(storesOfferPayload);

    this.setState({ pageNumber, offset });
  };

  onPageChange = pageNumber => {
    const { totalData, searchKey, offset } = this.state;
    const { getStoresOffer, selectedAirport } = this.props;
    const storesOfferPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };
    getStoresOffer(storesOfferPayload);
    this.setState({ pageNumber });
  };

  onSearchChange = searchKey => {
    const { pageNumber, offset } = this.state;
    const { getStoresOffer, selectedAirport } = this.props;

    const storesOfferPayload = {
      airport_code: selectedAirport,
      page_no: pageNumber,
      offset,
      search_key: searchKey
    };

    this.setState({ searchKey, pageNumber: 1 });
    getStoresOffer(storesOfferPayload);
  };

  render() {
    const {
      isLoading,
      selectedAirport,
      columns,
      searchKey,
      filterKeys,
      storesOfferFields,
      isAddStoresOfferForm,
      isEditStoresOfferForm,
      editRecordData
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {isAddStoresOfferForm && (
          <StoresOfferForm
            headerName="Add New Stores Offer"
            storesOfferFields={storesOfferFields}
            handleCancel={this.handleCancel}
            // userRoles={this.state.userRoles}
            toggleForm={this.toggleForm}
            toggleForm={this.toggleForm}
            selectedAirport={selectedAirport}
            isAddStoresOfferForm
          />
        )}
        {isEditStoresOfferForm && (
          <StoresOfferForm
            headerName="Edit Stores Offer"
            editRecord={this.state.editRecord}
            editRecordData={editRecordData}
            handleCancel={this.handleCancel}
            toggleForm={this.toggleForm}
            selectedAirport={this.state.selectedAirport}
            isEditStoresOfferForm
          />
        )}
        {!isLoading && !isAddStoresOfferForm && !isEditStoresOfferForm && (
          <React.Fragment>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="storesOffer">
              <TableOperations
                tablename="StoresOffer"
                addButtonText="StoresOffer"
                onAddNewClick={this.onAddNewClick}
                columns={columns}
                searchKey={searchKey}
                disableDownload
                onSearchChange={this.onSearchChange}
                // downloadUrl={DOWNLOAD_AIRPORTS}
                filterKeys={filterKeys}
                onApplyFilter={this.onApplyFilter}
                tableData={this.state.tableData}
              />
              <CommonTable
                columns={columns}
                dataSource={this.state.tableData}
                totalData={this.state.totalData}
                offset={this.state.offset}
                onPageChange={this.onPageChange}
                onOffsetChange={this.onOffsetChange}
                pageNumber={this.state.pageNumber}
                filterKeys={filterKeys}
              />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getStoresOfferResponse: state.storesOffer.getStoresOfferResponse,
    deleteStoresOfferResponse: state.storesOffer.deleteStoresOfferResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse,
    uploadBarcodeResponse: state.storesOffer.uploadBarcodeResponse,
    uploadRedeemResponse: state.storesOffer.uploadRedeemResponse,
    uploadFileResponse: state.uploadFile.uploadFileResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getStoresOffer,
    deleteStoresOffer,
    pageRefreshing,
    uploadBarcode,
    uploadRedeem,
    uploadFile
  }
)(withRouter(StoresOffer));
