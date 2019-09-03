import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    shipment: any;
    values: IValues[];
    loading: boolean;
}

class ViewShipment extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            shipment: {},
            values: [],
            loading: false
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3000/shipments/${this.state.id}`).then(data => {
            this.setState({ shipment: data.data });
        })
    }
    public render() {
        const {  shipment } = this.state;
        console.log(this.state);
        return (
            <div className="App">
                {this.state &&
                    <div>
                        <div>
                            <div className={"col-md-12"}>
                                <h2> View Shipment </h2>
                                    <div className="col-md-12">
                                        <i>Id:</i> {shipment.id}
                                    </div>

                                    <div className="col-md-12">
                                        <i>Name: </i> {shipment.name}
                                    </div>

                                    <div className="col-md-12">
                                        <i>Destination: </i>{shipment.destination}
                                    </div>

                                    <div className="col-md-12">
                                        <i>Mode: </i>{shipment.mode}
                                    </div>
                                     <div className="col-md-12">
                                        <i>Total: </i>{shipment.total}
                                    </div>
                                     <div className="col-md-12">
                                        <i>Type: </i>{shipment.type}
                                    </div>
                                    <div className="col-md-12">
                                        <i>Status: </i>{shipment.status}
                                    </div>
                                    <div className="col-md-12">
                                        {JSON.stringify(shipment.cargo)}                                    
                                    </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(ViewShipment)
