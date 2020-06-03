
import React, {Component} from 'react'
import './Calculator.css' 

import Bt from '../main/components/Button'
import Display from '../main/components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}


export default class Calculator extends Component{

    state = { ...initialState }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                // eslint-disable-next-line
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render(){

        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        const clear = cl => this.clearMemory()
        
        return ( 
            <div className = "calculator">
                <Display value={this.state.displayValue}/>
                <Bt label="AC" click = {clear} triple/>
                <Bt label="/" click={setOperation} operation/>
                <Bt label="7" click = {addDigit}/>
                <Bt label="8" click = {addDigit}/>
                <Bt label="9" click = {addDigit}/>
                <Bt label="*" click = {setOperation} operation/>
                <Bt label="4" click = {addDigit}/>
                <Bt label="5" click = {addDigit}/>
                <Bt label="6" click = {addDigit}/>
                <Bt label="-" click = {setOperation} operation/>
                <Bt label="1" click = {addDigit}/>
                <Bt label="2" click = {addDigit}/>
                <Bt label="3" click = {addDigit}/>
                <Bt label="+" click = {setOperation} operation/>
                <Bt label="0" click = {addDigit} double/>
                <Bt label="," click = {addDigit}/>
                <Bt label="=" click = {setOperation} operation/>
               
            </div>
        )
    }
}