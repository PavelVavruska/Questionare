var ReactDOM = require("react-dom"); 
import * as React from 'react';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

/*class LabelQ extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            value: 0
        };
    }
    render() {
        return (<Label required={ true }>I'm a required Label</Label>);
    }    
}*/



class SliderQ extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            value: 0,
            step: 1,
            min: 0,
            max: 10,
            id: 1
        };
    }
    render() {
        return (
        <div style={{width:400,padding:40, display: 'inline-block'}}>
            <Slider
          label={ this.props.text }
          min={ this.props.min }
          max={ this.props.max }
          step={ this.props.step }
          defaultValue={ this.props.value }
          showValue={ true }
          onChange={ (value) => console.log(value) }
        />
        </div>);
    }    
}

class OptionQ extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            text: "",
            value: 0
        };
    }
    render() {
        var elements = this.props.options.map(function(object, i){
            return (
                    <option id={object.id} >                                 
                        {object.displayValue}                                  
                    </option>);
        });
        return (<div className='ms-DropdownBasicExample' style={{display: 'inline-block'}}>
                    <div class="ms-Dropdown" tabindex="0">
                        <label class="ms-Label">{this.props.text}</label>
                        <i class="ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown"></i>
                        <select id={this.props.id} class="ms-Dropdown-select">
                            {elements}
                        </select>
                    </div>
                </div>);
    }    
}

class App extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {     
            value: 0,
            selectedItem: null,
            questions: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {   
        var that = this; 
                
        var url = 'http://31.31.74.102/QuestionnaireSample-1.0/api/questionnaire'

        fetch(url)
        .then(function(response) {
            if (response.status >= 400) {
            throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(data) {
            that.setState({ questions: data.questions });
        });
        
        // Offline Data
        /*that.setState({ questions: [
                {
                    "id":"spinnerQuestion",
                    "questionType":"SPINNER",
                    "text":"Which number would you select on this spinner ?",
                    "min":1,
                    "max":10
                },
                {
                    "id":"sliderQuestion",
                    "questionType":"SLIDER",
                    "text":"Which number would you select on this slider ?",
                    "min":1,
                    "max":10,
                    "step":1
                },
                {
                    "id":"optionsQuestion",
                    "questionType":"OPTIONS",
                    "text":"Which option do you like the best ?",
                    "options":[
                        {
                        "id":"firstOption",
                        "displayValue":"Hello"
                        },
                        {
                        "id":"second Option",
                        "displayValue":"Second Option"
                        }
                    ]
                }
            ] });*/
    }


    render() {
        let { disabled } = this.props;
        let { selectedItem } = this.state;
        var result = "";
               
        var elements = this.state.questions.map(function(object, i){
                        switch(object.questionType) {
                            case "SLIDER":
                                return (
                                <SliderQ 
                                 id={object.id} 
                                 label={object.id} 
                                 min={object.min} 
                                 max={object.max} 
                                 step={object.step} 
                                 text={object.text} 
                                />);
                            case "SPINNER":
                                return (
                                <SliderQ 
                                 id={object.id} 
                                 label={object.id} 
                                 min={object.min} 
                                 max={object.max} 
                                 step={object.step} 
                                 text={object.text} 
                                />);
                            case "OPTIONS":
                                return (
                                <OptionQ 
                                 id={object.id} 
                                 options={object.options} 
                                 text={object.text} 
                                />);
                        }
        }, this);

        return (
            <div>    
                <div className="container">                   
                    { elements }       
                </div>
                <CompoundButton
                type="submit"
                description='Click here to submit'
                disabled={ disabled }
                >                 
                    Submit
                </CompoundButton>
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));