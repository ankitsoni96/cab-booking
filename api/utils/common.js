class Common {
  getCurrentDateNTimeStamp() {
    const date = new Date()
    return { date: date, timestamp: Math.floor(date.getTime() / 1000) }
  }

  async validateJoiSchema(schema, body) {
    const value = await schema.validate(body)
    if (value.error) {
      console.log('=================value.error', JSON.stringify(value))
      const param = value.error.details[0].context.key
      const type = value.error.details[0].type
      const msg = value.error.details[0].message
      const error = {
        param,
        type,
        msg
      }
      throw error
    } else {
      return true
    }
  }
}

module.exports = new Common()