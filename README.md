# Formyl

Formyl is a library meant to be used with React that saves the state of forms and also offers custom validation

## Installation

```bash
npm install formyl
```

## API

* ```smartForm(object, ReactComponent)```
    * object has four properties. A submit handler, changeHandler, a validation method, and intial values of the form(s)
        * submitHandler(values) : Handles the submit event
        * changeHandler(values) : Called after onChange event is fired
        * validator(values) : Validates all values of all forms and returns an object with errors
        * initialValues : Plain JS object containing the name of the form(s) as a key and its initial value
        * Values is an object with all the form values that the Formyl handles

## Usage

```javascript
import {smartForm} from "formyl"


class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input
            value={this.props.values.name}
            name="name"
            onChange={this.props.onChange}
            type="text"
          />
          <input
            value={this.props.values.email}
            name="email"
            onChange={this.props.onChange}
            type="text"
          />
          <button type="submit">Submit</button>
        </form>
        <h1>{!this.props.errors.name ? "VALID" : this.props.errors.name}</h1>
        <h1>
          {!this.props.errors.email
            ? "VALID"
            : this.props.errors.email.map(e => e)}
        </h1>
      </div>
     
    );
  }
}
// returns smartForm
smartForm(
  {
    handleSubmit: values => console.log(values),
    handleChange: values => console.log(values),
    validate: values => {
      const errors = {};
      if (values.name.length < 5) {
        errors.name = "MUST BE AT LEAST  5 CHARS";
      }
      if (values.email.indexOf("@") === -1) {
        errors.email = ["EMAIL needs @symbol"];
      }
      return errors;
    },
    initialValues: { name: "", email: "abc@yahoo.com" }
  },
  Form
);


```
## Play around with the example here
https://codepen.io/anon/pen/ZwmpzN?editors=1010

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)