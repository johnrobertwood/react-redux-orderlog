import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectAuthor from '../common/SelectAuthor';
import SelectStatus from '../common/SelectStatus';

const OrderForm = ({ order, allAuthors, onSave, onDelete, onChange, saving }) => {
  return (
    <form>
      <h1>Manage Order</h1>

      <TextInput
        name="workorder"
        label="Work Order"
        value={order.workorder}
        onChange={onChange} />

      <SelectAuthor
        name="authorid"
        label="Inspector"
        value={order.authorid}
        defaultOption="Select Inspector"
        options={allAuthors}
        onChange={onChange} />

      <TextInput
        name="partnumber"
        label="Part Number"
        value={order.partnumber}
        onChange={onChange} />

      <TextArea
        name="notes"
        label="Notes"
        value={order.notes}
        onChange={onChange} />

      <SelectStatus 
        name="complete"
        value={order.complete} 
        label="Status"
        defaultOption={false}
        options={[{value: true, text: 'Complete'}, {value: false, text: 'Incomplete'}]}
        onChange={onChange} />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Deleting...' : 'Delete'}
        className="btn btn-primary"
        onClick={onDelete} />
    </form>
  );
};

OrderForm.propTypes = {
  order: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func,
  saving: React.PropTypes.bool
};

export default OrderForm;