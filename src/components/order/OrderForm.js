import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const OrderForm = ({ order, allAuthors, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Manage Order</h1>

      <TextInput
        name="title"
        label="Work Order"
        value={order.title}
        onChange={onChange}
        error={errors.title}/>

      <SelectInput
        name="authorId"
        label="Inspector"
        value={order.authorId}
        defaultOption="Select Inspector"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId}/>

      <TextInput
        name="category"
        label="Part Number"
        value={order.category}
        onChange={onChange}
        error={errors.category}/>

      <TextInput
        name="notes"
        label="Notes"
        value={order.notes}
        onChange={onChange}
        error={errors.notes}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

OrderForm.propTypes = {
  order: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default OrderForm;