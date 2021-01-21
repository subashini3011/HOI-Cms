import './index.scss'
import React, { Component } from 'react';

// containers
import TableOperations from 'components/tableOperations';
import StatisticCardContainer from 'containers/statistic-card';

// components
import CommonTable from 'components/commonTable';
import NewReportForm from 'components/forms/new-report-form'
import Loading from 'components/loading';

class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isShowNewReportForm: false,

            selectedAirport: this.props.selectedAirport,

            columns: [{
                title: 'Store Name',
                dataIndex: 'StoreName',
            }, {
                title: 'Retailer Name',
                dataIndex: 'RetailerName',
            }, {
                title: 'Terminal No.',
                dataIndex: 'TerminalNo',
            }, {
                title: 'Transaction No.',
                dataIndex: 'TransactionNo',
            }, {
                title: 'Receipt No.',
                dataIndex: 'ReceiptNo',
            }, {
                title: 'Date',
                dataIndex: 'Date',
            }, {
                title: 'Time',
                dataIndex: 'Time',
            }, {
                title: 'Time-1',
                dataIndex: 'Time1',
            },
            {
                title: 'Hours',
                dataIndex: 'Hours',
            }
            ],
            tableData: [
                {
                    key: '1',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456',
                    Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',

                }, {
                    key: '2',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456',
                    Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',

                }, {
                    key: '3',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456',
                    Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',

                }, {
                    key: '4',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456',
                    Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',

                }, {
                    key: '5',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456', Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',
                }, {
                    key: '6',
                    StoreName: 'CCD',
                    RetailerName: 'Aman',
                    TerminalNo: 'T3',
                    TransactionNo: 13456,
                    ReceiptNo: 'RE456',
                    Date: '23-DEC-2019',
                    Time: '17:00',
                    Time1: '17:05',
                    Hours: '12hrs',
                }
            ],

            filterKeys: ['StoreName', 'RetailerName', 'TerminalNo', 'TransactionNo', 'ReceiptNo', 'Date'],
        }

        // this.onAddNewClick = this.onAddNewClick.bind(this);
        // this.handleSave = this.handleSave.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
        // this.onApplyFilter = this.onApplyFilter.bind(this);
    }

    onAddNewClick = () => {
        this.setState({ isShowNewReportForm: true });
    }

    handleSave = (data) => {
        // this.props.addUser(data);
    }

    handleCancel = () => {
        this.setState({ isShowNewReportForm: false });
    }

    onApplyFilter = (filterKeys) => {
        this.setState({ filterKeys: filterKeys });
    }

    render() {
        const { isShowNewReportForm, isLoading } = this.state;
        return (
            <div>
                {
                    isShowNewReportForm &&
                    <NewReportForm headerName="Add New Report" handleSave={this.handleSave} handleCancel={this.handleCancel} />
                }

                {
                    !isShowNewReportForm &&
                    <div>
                        <StatisticCardContainer selectedAirport={this.state.selectedAirport} />

                        <div className="reports">
                            <div className="reports__table">

                                <div style={{ textAlign: 'center', padding: '5rem 0 10rem 0' }}>
                                    No Reports are there......
                                </div>

                                {/* <TableOperations 
                                    tablename="Reports" 
                                    addButtonText="Report" 
                                    columns={this.state.columns} 
                                    tableNavigation={true} 
                                    onAddNewClick={this.onAddNewClick}
                                    filterKeys={this.state.filterKeys}
                                    onApplyFilter={this.onApplyFilter}
                                />
                                <CommonTable 
                                    columns={this.state.columns} 
                                    dataSource={this.state.tableData} 
                                    filterKeys={this.state.filterKeys}
                                /> */}
                                                                
                            </div>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

export default Reports;