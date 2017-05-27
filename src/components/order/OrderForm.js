import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';

const OrderForm = ({ order, allAuthors, onSave, onDelete, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Manage Order</h1>

      <TextInput
        name="workorder"
        label="Work Order"
        value={order.workorder}
        onChange={onChange}
        error={errors.title} />

      <SelectInput
        name="authorid"
        label="Inspector"
        value={order.authorid}
        defaultOption="Select Inspector"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId} />

      <TextInput
        name="partnumber"
        label="Part Number"
        value={order.partnumber}
        onChange={onChange}
        error={errors.category} />

      <TextArea
        name="notes"
        label="Notes"
        value={order.notes}
        onChange={onChange}
        error={errors.notes} />

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
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default OrderForm;