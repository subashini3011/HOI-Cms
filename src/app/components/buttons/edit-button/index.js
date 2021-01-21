import React, { Component } from "react";

import { message, Icon, Tag, Popconfirm } from "components/ui";

class EditButton extends Component {
  render() {
    const { handleEdit, record } = this.props;
    return (
      <Tag
        color="geekblue"
        style={{ marginRight: "1rem" }}
        onClick={e => {
          handleEdit(e, record);
        }}
        className="u_cursor_pointer"
      >
        Edit
      </Tag>
    );
  }
}
export default EditButton;
