import React, { Component } from 'react';
import './Test.css';

class Test extends React.Component{

        onHover(e){
                document.querySelector('.menu').style.left=0;
                console.log('event')
        }

        onOut(e){
                document.querySelector('.menu').style.left='-230px';
        }

        render(){
                return(
                    <div>
                            <div className='menu' onMouseOver={this.onHover} onMouseOut={this.onOut} onClick={this.onHover}>
                                    <ul>
                                            <button>test</button>
                                            <li>item2</li>
                                            <li>item3</li>
                                    </ul>
                            </div>
                        <div className='tested' onClick={this.onOut}>
                        test context
                        </div>
                    </div>
                )
        }
}

export default Test;