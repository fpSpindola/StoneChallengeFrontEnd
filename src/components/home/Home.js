import React, {Component} from 'react';
import {store} from '../../store';
import HomeAPI from '../../api/funcionarios'
import {newBreadcrumb} from '../../store/nav/actions';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.start = null;
        this.services = [
            {service: 'funcionario', icon: 'fa fa-cogs', label: 'Funcionario'}];
        this.state = {funcionario: true}
    }

    componentWillUnmount(){
        clearInterval(this.start);
    }

    componentDidMount() {
        store.dispatch(newBreadcrumb(["Home"]))
    }

    componentWillMount() {
        this.update();
        this.start = setInterval(this.update(), 10000);
    }

    update = () => {
        HomeAPI.getFuncionarios().then(data => this.setState(data))
    };

    render(){
        return (
            <div className="row">
                {this.services.map((service, index) => {
                    console.log(service.service);
                    return <div className={"col-2" + (index < 6 ? '' : ' pt-3')} key={service.service}>
                        <div className="border-box p-1">
                            <article className={'home-box ' + ((this.state[service.service] === true) ? 'success' :
                                (this.state[service.service] === false) ? 'warning': 'danger')}>
                                <div>
                                    <div className="home-icon"><i className={service.icon}/></div>
                                    <div className="pb-2"><small><strong>{service.label}</strong></small></div>
                                </div>
                            </article>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}