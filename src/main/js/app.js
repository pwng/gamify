'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
var playerService = require('./data.js').playerService  ;
var router = require('./router.js').router ;

var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    getInitialState: function() {
        return {searchKey: ""};
    },
    searchHandler: function(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
            </div>

        );
    }
});

var PlayerListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#players/" + this.props.player.id}>
                    <img className="media-object small pull-left" src={"pics/" + this.props.player.firstName + "_" + this.props.player.lastName + ".jpg" }/>
                    {this.props.player.firstName} {this.props.player.lastName}
                    <p>{this.props.player.title}</p>
                </a>
            </li>
        );
    }
});

var PlayerList = React.createClass({
    render: function () {
        var items = this.props.players.map(function (player) {
            return (
                <PlayerListItem key={player.id} player={player} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="Gamification" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <PlayerList players={this.props.players}/>
                </div>
            </div>
        );
    }
});

var PlayerPage = React.createClass({
    getInitialState: function() {
        return {player: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.playerId).done(function(result) {
            this.setState({player: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Player" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={"pics/" + this.state.player.firstName + "_" + this.state.player.lastName + ".jpg" }/>
                            <h1>{this.state.player.firstName} {this.state.player.lastName}</h1>
                            <p>{this.state.player.title}</p>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.player.personalinformation} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Personal Information
                                    <p>{this.state.player.personalinformation}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.player.course} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Course
                                    <p>{this.state.player.course}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"sms:" + this.state.player. progress} className="push-right">
                                <span className="media-object pull-left icon icon-progress"></span>
                                <div className="media-body">
                                 Progress
                                    <p>{this.state.player. progress}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"mailto:" + this.state.player.pbl} className="push-right">
                                <span className="media-object pull-left icon icon-pbl"></span>
                                <div className="media-body">
                                PBL
                                    <p>{this.state.player.pbl}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: '',
            players: [],
            page: null
        }
    },
    searchHandler: function(searchKey) {
        playerService.findByName(searchKey).done(function(players) {
            this.setState({searchKey:searchKey, players: players, page: <HomePage searchKey={searchKey} searchHandler={this.searchHandler} players={players}/>});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler} players={this.state.players}/>});
        }.bind(this));
        router.addRoute('players/:id', function(id) {
            this.setState({page: <PlayerPage playerId={id} service={playerService}/>});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)
