class response {
  constructor(status, data) {
    this.init();
    this.status = status;
    this.data = data || {};
  }

  init() {
    this.status = 200;
    this.data = {};
    this.msg = '';
    this.errors = [];
    return this;
  }

  status(status) {
    this.status = status;
    return this;
  }

  msg(msg) {
    this.msg = msg;
    return this;
  }

  data(data) {
    this.data = data;
    return this;
  }

  error(label, msg) {
    this.errors.push({ label, msg });
    return this;
  }

  getBody() {
    return {
      msg: this.msg,
      data: this.data,
      errors: this.errors
    };
  }
}

module.exports = { response };
