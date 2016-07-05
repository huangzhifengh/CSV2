import strategies from './strategies'

class Validator {

  constructor (rules, options = {}) {
    this.validate = () => true
    this.initValidator(rules, options)
  }

  initValidator (rules, options) {
    let splitor = options.splitor || '::'
    let matchedStrategies = []

    if (_.isArray(rules)) {
      rules.map(rule => {
        matchedStrategies.push((value, data) => {
          let strategyArg = rule.split(splitor)

          if (strategyArg[1]) {
            strategyArg[1] = this.getRealValue(strategyArg[1], data)
          }

          let strategy = strategyArg.shift()
          strategyArg.unshift(value)

          return strategies[strategy] ? strategies[strategy].apply(this, strategyArg) : true
        })
      })
    } else if (_.isFunction(rules)){
      matchedStrategies.push(rules)
    } else {
      return 
    }

    return this.validate = (value, data) => {
      let result = true
      let length = matchedStrategies.length
      for (let i = 0; i < length; i++) {
        result = result && matchedStrategies[i](value, data)
        if (!result) break
      }

      return result
    }
  }

  getRealValue (fakeValue, data) {
    let itIsVar = fakeValue.match(/^\{([^\{}].*)\}$/)
    return itIsVar ? (data[itIsVar[1]]) : fakeValue
  }

  check (value, data) {
    return this.validate(value, data)
  }
}

export default Validator

