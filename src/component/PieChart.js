import React, { Component } from 'react';



class Piechart extends Component {
    constructor(props) {
        super(props);
    }
    pie = d3.layout.pie().value((d) => d.value);
    colors = d3.scale.category10();
    arcGenerator(d, i) {
    }
    render() {

    }
}
export default Piechart;