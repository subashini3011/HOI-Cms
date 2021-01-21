import React, { Component } from 'react';
import './index.scss';

// import moment from 'moment';

import { Form, Input, Row, Col, DatePicker} from 'components/ui';

// components
import FormButtons from 'components/forms/shared-form-components/new-form-buttons';
import FormHeader from 'components/forms/shared-form-components/new-form-header';

class NewReportForm extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let date = moment(values.modified_on).format('YYYY-MM-DD HH:MM:SS');


                this.props.handleSave();
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (

            <div className="new-report">
                <Row className="new-report--header">
                    <FormHeader headerName={this.props.headerName} />
                </Row>

                <Form onSubmit={this.handleSubmit} className="new-report--form">
                    <Row type="flex" justify="space-between">
                        <Col md={24} lg={10}>
                            <Row className="new-report--form--item">
                                <Form.Item label="Store Name">
                                    {getFieldDecorator('store_name', {
                                        rules: [{ required: true, message: 'Please input the storename!' }],
                                    })(
                                        <Input placeholder="Enter the Storename" />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row className="new-report--form--item">
                                <Form.Item label="Terminal No.">
                                    {getFieldDecorator('terminal_no', {
                                        rules: [{ required: true, message: 'Please input the terminal no.!' }],
                                    })(
                                        <Input placeholder="Enter the Terminal No." />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row className="new-report--form--item">
                                <Form.Item label="Transaction No.">
                                    {getFieldDecorator('transaction_no', {
                                        rules: [{ required: true, message: 'Please input the transaction no.!' }],
                                    })(
                                        <Input placeholder="Enter the Transaction No." />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row className="new-report--form--item">
                                <Form.Item label="Receipt No.">
                                    {getFieldDecorator('receipt_no', {
                                        rules: [{ required: true, message: 'Please input the receipt no.!' }],
                                    })(
                                        <Input placeholder="Enter the Receipt No." />
                                    )}
                                </Form.Item>
                            </Row>
                            
                        </Col>

                        <Col md={24} lg={10}>
                            <Row className="new-report--form--item">
                                <Form.Item label="Retailer Name">
                                    {getFieldDecorator('retailer_name', {
                                        rules: [{ required: true, message: 'Please input the retailername!' }],
                                    })(
                                        <Input placeholder="Enter the Retailername" type="email" />
                                    )}
                                </Form.Item>
                            </Row>
                           
                            <Row className="new-report--form--item">
                                <Form.Item label="Time">
                                    {getFieldDecorator('time', {
                                        rules: [{ required: true, message: 'Please input the time!' }],
                                    })(
                                        <Input placeholder="Enter the time" />
                                    )}
                                </Form.Item>
                            </Row> 
                            <Row className="new-report--form--item">
                                <Form.Item label="Time-1">
                                    {getFieldDecorator('time_1', {
                                        rules: [{ required: true, message: 'Please input the time-1!' }],
                                    })(
                                        <Input placeholder="Enter the time-1" />
                                    )}
                                </Form.Item>
                            </Row>
                             <Row className="new-report--form--item">
                                <Form.Item label="Date">
                                    {getFieldDecorator('date', {
                                        rules: [{ type: 'object', required: true, message: 'Please select date!' }],
                                    })(
                                        <DatePicker placeholder="Select the date" format="DD/MM/YYYY" getPopupContainer={trigger => trigger.parentNode} />
                                    )}
                                </Form.Item>
                            </Row>    

                        </Col>
                    </Row>

                    <Row className="new-report--form--buttons">
                        <FormButtons handleCancel={this.props.handleCancel} />
                    </Row>

                </Form>
            </div>

        );
    }
}

export default Form.create()(NewReportForm);
