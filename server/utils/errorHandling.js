const handleSchemaError = errObj => {
  const error = {
    fields: {
      unique: [],
      required: [],
      string: []
    },
    msg: {}
  };

  Object.keys(errObj).forEach(k => {
    if (errObj[k].kind === "required") {
      error.fields.required.push(errObj[k].path);
      error.msg.required = "Fields are required";
    } else if (errObj[k].kind === "unique") {
      error.fields.unique.push(errObj[k].path);
      error.msg.unique = "Fields should be unique";
    } else if (errObj[k].kind === "String") {
      error.fields.string.push(errObj[k].path);
      error.msg.string = "Fields should be string";
    } else {
      error.msg.server = "Server Error";
    }
  });

  return error;
};

const ErrorHandler = {
  handleSchemaError
};

module.exports = ErrorHandler;
