import "./index.scss";
import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import Loading from "components/loading";
import StatisticCardContainer from "containers/statistic-card";
import { Table, Tag, Icon, Popconfirm, message } from "components/ui";
import {
  getSubCategory,
  deleteCategory
} from "../../redux/actions/outletsActions";
import { pageRefreshing } from "../../redux/actions/nonApiActions";
// component

import AddNewRow from "../../components/tableOperations/add-new-button";
import CategoryModal from "../../components/modals/category-modal";
import SubCategoryModal from "../../components/modals/sub-category-modal";
// container

class CategoryList extends Component {
  constructor(props) {
    super(props);
    const { selectedAirport } = this.props;
    this.state = {
      isLoading: true,
      isAddCategory: false,
      isEditCategory: false,
      selectedAirport,
      showModal: false,
      showSubCategoryModal: false,
      editRecord: [],
      editSubCategoryRecord: [],
      columns: [
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Icon",
          dataIndex: "image",
          render: text => (
            <img
              src={text}
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
              alt="category"
            />
          )
        },
        {
          title: "Action",
          dataIndex: "Action",
          width: "13rem",
          render: (text, record) => (
            <span className="category-list__table-actions u_no_wrap">
              <Tag
                color="geekblue"
                style={{ marginRight: "1rem" }}
                onClick={e => {
                  this.handleEditModal(e, record);
                }}
                className="u_cursor_pointer"
              >
                Edit
              </Tag>
              <div onClick={e => e.stopPropagation()}>
                <Popconfirm
                  placement="topRight"
                  title="Are you sure delete this record?"
                  icon={
                    <Icon type="exclamation-circle" style={{ color: "red" }} />
                  }
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
              </div>
            </span>
          )
        }
      ],
      subCategoryListColumns: [
        {
          title: "Sub-category Name",
          dataIndex: "sub_category"
        },
        {
          title: "Image",
          dataIndex: "image",
          render: text => (
            <img
              src={text}
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
              alt="subcategory"
            />
          )
        },
        {
          title: "Selected Image",
          dataIndex: "selected_image",
          render: text => (
            <img
              src={text}
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
              alt="selected"
            />
          )
        },
        {
          title: "Action",
          dataIndex: "Action",
          width: "13rem",
          render: (text, record) => (
            <span className="u_no_wrap">
              <Tag
                color="geekblue"
                style={{ marginRight: "1rem" }}
                onClick={e => {
                  this.handleEditSubCategoryModal(e, record);
                }}
                className="u_cursor_pointer"
              >
                Edit
              </Tag>
              <Popconfirm
                placement="topRight"
                title="Are you sure delete this record?"
                icon={
                  <Icon type="exclamation-circle" style={{ color: "red" }} />
                }
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
            </span>
          )
        }
      ],
      tableData: [],
      selectedCategory: []
    };
  }

  componentDidMount() {
    const { getSubCategory } = this.props;
    getSubCategory();
  }

  componentWillReceiveProps(nextProps) {
    const {
      getSubCategoryResponse,
      deleteCategoryResponse,
      pageRefreshingResponse,
      getSubCategory
    } = this.props;
    if (
      nextProps.getSubCategoryResponse &&
      nextProps.getSubCategoryResponse !== getSubCategoryResponse
    ) {
      if (
        nextProps.getSubCategoryResponse.error === 0 &&
        nextProps.getSubCategoryResponse.content
      ) {
        this.handleTableData(nextProps.getSubCategoryResponse.content);
      }
    }
    if (
      nextProps.deleteCategoryResponse &&
      nextProps.deleteCategoryResponse !== deleteCategoryResponse
    ) {
      if (
        nextProps.deleteCategoryResponse.error === 0 &&
        nextProps.deleteCategoryResponse.message
      ) {
        message.success(nextProps.deleteCategoryResponse.message);
        getSubCategory();
      } else {
        message.error(nextProps.deleteCategoryResponse.message);
      }
    }
    if (
      nextProps.pageRefreshingResponse &&
      nextProps.pageRefreshingResponse !== pageRefreshingResponse
    ) {
      if (nextProps.pageRefreshingResponse.isLoading === true) {
        this.setState({
          isLoading: nextProps.pageRefreshingResponse.isLoading,
          isAddCategory: false,
          isEditCategory: false,
          isAddSubCategory: false,
          isEditSubCategory: false
        });
        getSubCategory();
      }
    }
  }

  handleTableData = data => {
    const tableData = data;
    const { selectedCategory } = this.state;
    const { pageRefreshing } = this.props;
    if (data.length > 0) {
      let highlightCategory = data[0];
      if (selectedCategory && selectedCategory.id) {
        highlightCategory = data.find(item => item.id === selectedCategory.id);
      }
      this.setState({
        tableData,
        selectedCategory: highlightCategory,
        isLoading: false
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
    pageRefreshing({ isLoading: false });
  };

  selectRow = (e, record) => {
    e.stopPropagation();
    const { tableData } = this.state;
    let data = tableData[0];
    if (record && record.id) {
      data = tableData.find(item => item.id === record.id);
    }
    this.setState({
      selectedCategory: data,
      isAddCategory: false,
      isEditCategory: false,
      isAddSubCategory: false,
      isEditSubCategory: false
    });
  };

  setRowClassName = record => {
    const { selectedCategory, tableData } = this.state;
    if (record && record.id) {
      if (selectedCategory && selectedCategory.id) {
        return record.id === selectedCategory.id
          ? "category-list__selected-row"
          : "";
      }
      return record.id === tableData[0].id ? "category-list__selected-row" : "";
    }
  };

  handleEditModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      isAddCategory: false,
      isEditCategory: true,
      editRecord: record
    });
  };

  handleEditSubCategoryModal = (e, record) => {
    e.stopPropagation();
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showSubCategoryModal: true,
      isAddSubCategory: false,
      isEditSubCategory: true,
      editSubCategoryRecord: record
    });
  };

  handleDelete = (e, record) => {
    const { selectedCategory, tableData } = this.state;
    const { deleteCategory } = this.props;
    e.stopPropagation();
    const data = {
      id: record.id
    };
    if (record.id === selectedCategory.id) {
      this.setState({ selectedCategory: tableData[0] });
    }
    deleteCategory(data);
  };

  handleShowModal = () => {
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showModal: true,
      showSubCategoryModal: false,
      isAddCategory: true,
      isEditCategory: false
    });
  };

  handleSubCategoryModal = () => {
    // const {isAddCategory,isEditCategory} = this.state;
    this.setState({
      showSubCategoryModal: true,
      showModal: false,
      isAddSubCategory: true,
      isEditSubCategory: false
    });
  };

  toggleForm = () => {
    const {
      isAddCategory,
      isEditCategory,
      isAddSubCategory,
      isEditSubCategory
    } = this.state;
    const { getSubCategory } = this.props;
    if (isAddCategory) {
      getSubCategory();
      this.setState({ isAddCategory: false });
    } else if (isEditCategory) {
      getSubCategory();
      this.setState({
        isEditCategory: false
        // pageNumber: 1,
        // offset: 6,
        // search_key: ''
      });
    } else if (isAddSubCategory) {
      getSubCategory();
      this.setState({
        isAddSubCategory: false
        // pageNumber: 1,
        // offset: 6,
        // search_key: ''
      });
    } else if (isEditSubCategory) {
      getSubCategory();
      this.setState({
        isEditSubCategory: false
        // pageNumber: 1,
        // offset: 6,
        // search_key: ''
      });
    }
  };

  render() {
    const {
      isAddCategory,
      isLoading,
      isEditCategory,
      showModal,
      editRecord,
      selectedCategory,
      showSubCategoryModal,
      editSubCategoryRecord,
      isAddSubCategory,
      isEditSubCategory,
      selectedAirport,
      columns,
      subCategoryListColumns,
      tableData
    } = this.state;
    return (
      <div>
        {isLoading && <Loading />}

        {showModal && isAddCategory && (
          <CategoryModal
            showModal={showModal}
            toggleForm={this.toggleForm}
            isAddCategory={isAddCategory}
          />
        )}
        {showModal && isEditCategory && (
          <CategoryModal
            showModal={showModal}
            editRecord={editRecord}
            toggleForm={this.toggleForm}
            isEditCategory={isEditCategory}
          />
        )}
        {showSubCategoryModal && isAddSubCategory && (
          <SubCategoryModal
            showSubCategoryModal={showSubCategoryModal}
            toggleForm={this.toggleForm}
            selectedCategory={selectedCategory}
            isAddSubCategory={isAddSubCategory}
          />
        )}
        {showSubCategoryModal && isEditSubCategory && (
          <SubCategoryModal
            showSubCategoryModal={showSubCategoryModal}
            selectedCategory={selectedCategory}
            editRecord={editSubCategoryRecord}
            toggleForm={this.toggleForm}
            isEditSubCategory={isEditSubCategory}
          />
        )}

        {!isLoading && (
          <div>
            {/* <StatisticCardContainer selectedAirport={selectedAirport} /> */}
            <div className="category-list__table-wrapper">
              <div className="category-list__left-table">
                <div className="category-list__header">
                  <p className="category-list__title">Categories</p>
                  <AddNewRow
                    addButtonText="Category"
                    onAddNewClick={this.handleShowModal}
                  />
                </div>

                <Table
                  className="category-list__table"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  onRow={record => ({
                    onClick: e => {
                      this.selectRow(e, record);
                    }
                  })}
                  rowClassName={record => this.setRowClassName(record)}
                />
              </div>
              {selectedCategory && selectedCategory.sub_category && (
                <div className="category-list__right-table">
                  <div className="category-list__header">
                    <p className="category-list__title">
                      Sub Categories of {selectedCategory.name}
                    </p>
                    <AddNewRow
                      addButtonText="Sub Category"
                      onAddNewClick={this.handleSubCategoryModal}
                    />
                  </div>

                  <Table
                    className="category-list__table"
                    columns={subCategoryListColumns}
                    dataSource={selectedCategory.sub_category}
                    pagination={false}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    getSubCategoryResponse: state.outlets.getSubCategoryResponse,
    deleteCategoryResponse: state.outlets.deleteCategoryResponse,
    pageRefreshingResponse: state.nonApiStore.pageRefreshingResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getSubCategory,
    deleteCategory,
    pageRefreshing
  }
)(withRouter(CategoryList));

// CategoryList.propTypes = {
//   selectedAirport: PropTypes.string.isRequired,

//   getSubCategoryResponse: PropTypes.arrayOf,
//   deleteCategoryResponse: PropTypes.arrayOf,
//   pageRefreshingResponse: PropTypes.arrayOf,

//   getSubCategory: PropTypes.func.isRequired,
//   pageRefreshing: PropTypes.func.isRequired
// };

// CategoryList.defaultProps = {
//   getSubCategoryResponse: [],
//   deleteCategoryResponse: [],
//   pageRefreshingResponse: []
// };
