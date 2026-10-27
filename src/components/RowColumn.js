import React, { Component } from 'react'
import Card from './Card'

export default class RowColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchApplicators: this.props.searchApplicators
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchApplicators !== prevProps.searchApplicators) {
            this.setState({ searchApplicators: this.props.searchApplicators });
        }
    }

    render() {
        return (
            <div className='container my-3' >
                <div className='row'>
                    {this.state.searchApplicators.length === 0 ? (
                        <div className='col-12'>
                            <p>No applicators found.</p>
                        </div>
                    ) : (
                        this.state.searchApplicators.map((element, index) => {
                            return (
                                <div className='col-md-3' key={element.applicatorChildPartMappingId}>
                                    <Card
                                        applicatorNumber={element.applicator.applicatorId}
                                        applicatorChildPartNumber={element.applicatorChildPart.applicatorChildPartNumber}
                                        applicatorChildPartType={element.applicatorChildPart.applicatorChildPartTypemaster.appChildPartType}
                                        applicatorChildPartDescription={element.applicatorChildPart.applicatorChildPartDescription}
                                        image={element.applicatorChildPart.applicatorChildPartTypemaster.image}
                                    />
                                </div>

                            );
                        })
                    )}
                </div>
            </div>

        )
    }
}
