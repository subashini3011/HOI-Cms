import React from "react";
import PropTypes from "prop-types";

// components
import { Row, Col } from "components/ui";
import "./index.scss";
import TableNav from "./tableNav";
import TableSearch from "./tableSearch";
import TableFilter from "./tableFilters";
import TableDownload from "./tableDownload";
import AddNewRow from "./add-new-button";

const TableOperations = ({
  tablename,
  tableNavigation,
  tableData,
  columns,
  filterKeys,
  disableSearch,
  searchKey,
  downloadUrl,
  addButtonText,
  disableDownload,
  disableAddRow,
  onApplyFilter,
  onSearchChange,
  onDownloadClick,
  onAddNewClick,
  isAddAirportDisable
}) => {
  return (
    <Row className="tableoperationscontainer">
      <Col span={6} className="tableoperationscontainer__tablename">
        {tablename}
      </Col>
      <Col span={18} className="tableoperationscontainer__tableoperations">
        {tableNavigation ? <TableNav /> : null}
        {tableData && tableData.length > 0 && (
          <React.Fragment>
            <TableFilter
              columns={columns}
              filterKeys={filterKeys}
              onApplyFilter={onApplyFilter}
            />

            {!disableDownload && (
              <TableDownload
                tablename={tablename}
                downloadUrl={downloadUrl}
                onDownloadClick={onDownloadClick}
              />
            )}
          </React.Fragment>
        )}
        {!disableSearch && (
          <TableSearch searchKey={searchKey} onSearchChange={onSearchChange} />
        )}
        {!disableAddRow && (
          <AddNewRow
            addButtonText={addButtonText}
            onAddNewClick={onAddNewClick}
            isAddAirportDisable={isAddAirportDisable}
          />
        )}
      </Col>
    </Row>
  );
};
export default TableOperations;

TableOperations.propTypes = {
  tablename: PropTypes.string,
  tableNavigation: PropTypes.bool,
  tableData: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  filterKeys: PropTypes.arrayOf(PropTypes.any),
  disableSearch: PropTypes.bool,
  searchKey: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string,
  addButtonText: PropTypes.string,
  disableDownload: PropTypes.bool,
  disableAddRow: PropTypes.bool,
  onApplyFilter: PropTypes.func,
  onSearchChange: PropTypes.func,
  onDownloadClick: PropTypes.func,
  onAddNewClick: PropTypes.func,
  isAddAirportDisable: PropTypes.bool
};

TableOperations.defaultProps = {
  tablename: "",
  tableNavigation: false,
  tableData: [],
  columns: [],
  filterKeys: [],
  disableSearch: false,
  downloadUrl: undefined,
  addButtonText: "",
  disableDownload: false,
  disableAddRow: false,
  onApplyFilter: () => {},
  onSearchChange: () => {},
  onDownloadClick: () => {},
  onAddNewClick: () => {},
  isAddAirportDisable: false
};
