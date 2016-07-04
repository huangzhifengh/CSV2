import strategies from './strategies'

const varReg = /^\{([^\{}].*)\}$/

class Validator {

  constructor (rules, options = {}) {
    this.initValidator(rules, options)
  }

  initStrategy () {
    return {
      required (value) {
        return !!value
      },

      isNumber (value) {
        return /^\d+$/.test(value)
      },

      equalTo (value, target) {
        return value === target
      },

      pattern (value, pattern) {
        if(value!=='' && value!==undefined){
          return new RegExp(pattern).test(value)
        }
        return true
      },

      minLength (value, length) {
        return value.replace(/[\u4e00-\u9fa5]/g, '**').length >= Number(length)
      },

      maxLength (value, length) {
        return value.replace(/[\u4e00-\u9fa5]/g, '**').length <= Number(length)
      },

      maxValue (value, target) {
        return Number(value) <= target
      },

      notEqualTo (value, target) {
        return value !== target
      },

      minValue (value, min) {
        return Number(value) >= Number(min)
      },

      noSpecialChar (value) {
        var myReg = /[~`\-\_^@\/\'\\\"#$%&\*\?\(\),\+;\[\]\{\}\|\.:：<>!！￥？（），。、—]/
        return !myReg.test(value)
      }
    }
  }

  initValidator (rules, options) {
    let splitor = options.splitor || '::'
    let matchedStrategies = []

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
    let itIsVar = fakeValue.match(varReg)
    return itIsVar ? (data[itIsVar[1]]) : fakeValue
  }

  check (value, data) {
    return this.validate(value, data)
  }
}

export default Validator

