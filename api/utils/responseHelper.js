const messages = require('./messages.json')

class ResponseHelper {
  error(res, language, msg, data) {
    console.log('in error-->>', msg);
    const response = {
      code: 0,
      status: 'FAIL',
      data: {
        ...data
      },
      message: this.getMessage(msg, language)
    }
    if (msg === 'NOT_AUTHORIZED') response.code = 401
    if(res) {
      res.json(response)
    } else {
      return response;
    }
  }

  success(res, language, data, msg) {
    const response = {
      code: 1,
      status: 'SUCCESS',
      message: this.getMessage(msg, language),
      ...data
    }
    if(res) {
      res.json(response)
    } else {
      return response;
    }
  }

  custom(res, language, code, status, msg, data, total) {
    const response = {
      code: code,
      status: status,
      message: this.getMessage(msg, language),
      ...data,
      total: total
    }
    res.status(200).json(response)
  }

  getMessage(msg, language) {
    console.log('===================Message ::', msg)
    let lang = 'en'
    if (language) {
      lang = language
    }
    if (!msg) {
      msg = 'SUCCESS'
    }
    if (msg.param || msg.type || msg.msg) {
      if (msg.msg) {
        return msg.msg
      } else if (msg.type.includes('required')) {
        return messages[lang].PARAM_REQUIRED.replace('PARAM', msg.param)
      } else {
        return messages[lang].INVALID_PARAM.replace('PARAM', msg.param)
      }
    } else if (msg.ref) {
      return messages[lang].DOES_NOT_EXIST.replace('PARAM', msg.ref)
    } else if (msg.unique) {
      return messages[lang].ALREADY_EXISTS.replace('PARAM', msg.unique)
    } else if (msg && msg.toString().includes('ReferenceError:')) {
      console.log('======================ERROR=====================')
      console.log(msg)
      console.log('================================================')
      return msg.message
    } else {
      return messages[lang][msg] ? messages[lang][msg] : msg.toString()
    }
  }
}

module.exports = new ResponseHelper()
