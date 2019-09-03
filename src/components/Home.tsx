import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import axios from 'axios';


interface IState {
    shipments: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { shipments: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3000/shipments`).then(data => {
            this.setState({ shipments: data.data })
        })
    }

    public render() {
        const shipments = this.state.shipments;
        return (
            <div>
                {shipments.length === 0 && (
                    <div className="text-center">
                        <h2>No shipments found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <ReactTable
                      data={shipments}
                      filterable
                      defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value
                      }
                      columns={[
                        {
                          Header: "ID",
                          id: "id",
                          accessor: d => d.id
                        },
                        {
                          Header: "Name",
                          id: "name",
                          accessor: d => d.name,
                          filterAll: true
                        },
                        {
                          Header: "Origin",
                          id: "origin",
                          accessor: d => d.origin,
                          filterAll: true
                        },
                        {
                          Header: "Status",
                          id: "status",
                          accessor: d => d.status,
                          filterAll: true
                        },
                        {
                          Header: "Action",
                          id: "userId",
                          Cell: row => (
                            <div className="alignLeft">
                              <Link to={`/view/${row.original.id}`} className="btn btn-sm btn-outline-secondary">View </Link>
                            </div>
                          ),
                           filterAll: false
                        }
                      ]}
                      defaultPageSize={20}
                      className="-striped -highlight"
                    />
                </div>
            </div>
        )
    }
}
