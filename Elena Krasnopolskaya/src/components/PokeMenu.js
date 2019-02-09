import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link, NavLink} from 'react-router-dom';

class PokeMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;

        return (
            <div className=' pt-4 mb-2'>

                <div className='pl-4  position-absolute'>
                    <Button className="border border-warning border-3"
                            aria-owns={anchorEl ? 'menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                    >
                        Menu
                    </Button>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}><NavLink className='nav-link' to='/'
                                                                      activeClassName='link-active'>
                            Pokedex</NavLink></MenuItem>
                        <MenuItem onClick={this.handleClose}><NavLink className='nav-link' to='/catched'
                                                                      activeClassName='link-active'>
                            Catched pokemons</NavLink></MenuItem>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default PokeMenu;