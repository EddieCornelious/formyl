import React from 'react';

export function smartForm(
  {handleSubmit, handleChange, validate, initialValues},
  reactComponent
) {
  return class WrapperForm extends React.Component {
    constructor(props) {
      super(props);

      this.onChange = this.preHandleChange.bind(this);
      this.onSubmit = this.preSubmit.bind(this);
      this.errors = {};
      this.values = initialValues;
      this.state = {
        isSubmitting: false
      };
    }

    preSubmit(e) {
      e.preventDefault();
      const self = this;
      const values = self.values;
      self.errors = validate(values);

      if (Object.keys(self.errors).length > 0) {
        return self.setState({
          isSubmitting: false
        });
      }
      return self.setState(
        {
          isSubmitting: true
        },
        () => {
          handleSubmit(self.values);
        }
      );
    }

    preHandleChange(e) {
      const value = e.target.value;
      const name = e.target.name;
      const self = this;

      self.values = Object.assign({}, self.values, {[name]: value});
      handleChange(self.values);
      self.setState({
        isSubmitting: false
      });
    }

    render() {
      this.errors = validate(this.values);
      const {onChange, onSubmit, errors, values} = this;
      const {isSubmitting} = this.state;

      return React.createElement(reactComponent, {
        onSubmit,
        onChange,
        values,
        isSubmitting,
        errors
      });
    }
  };
}
