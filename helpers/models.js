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

  setStatus(status) {
    this.status = status;
    return this;
  }

  setMsg(msg) {
    this.msg = msg;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setError(label, msg) {
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
