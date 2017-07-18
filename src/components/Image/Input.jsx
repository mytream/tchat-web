import './Input.scss'

import React from 'react'
import { Icon, Button, Progress, Modal, message, notification } from 'tezign-react-ui'
import _ from 'lodash'
import TzIcon from 'trc-icon'
import constants from '../../common/constants'
import notice from '../../common/notice'
import util from '../../common/util'

const DEFAULT_MAXSIZE = 5 * 1024 * 1024;

const DEFAULT_PLACEHOLDER = '点击上传图片';

class ImageInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      file : props.value
    };
    this.chooseFile = this.chooseFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.file) {
      this.setState({file: nextProps.file});
    }
  }

  chooseFile() {
    let { onChange, maxsize } = this.props;
    util.chooseFile({
      accept: 'image/*',
      maxsize: maxsize || DEFAULT_MAXSIZE,
    }).then(file => {
      this.state.file = file;
      this.forceUpdate();
      onChange(file);
    });
  }

  deleteFile() {
    let { onChange } = this.props;
    this.setState({file: undefined});
    onChange(undefined);
  }

  render() {
    let { className } = this.props;
    let style = _.pick(this.props, ['width', 'height']);
    let cls = 'image-input';
    if (className) cls += ' ' + className;
    return (
      <div className={cls} style={style}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    let { file } = this.state;
    if (file) return this.renderResult();
    return this.renderBlank();
  }

  renderBlank() {
    let { placeholder } = this.props;
    return (
      <div className="input-blank" onClick={this.chooseFile}>
        <div className="blank-inner">
          <div className="blank-icon">
            <TzIcon type="icon-tz-plus" />
          </div>
          <div className="blank-text">
            { placeholder || DEFAULT_PLACEHOLDER }
          </div>
        </div>
      </div>
    )
  }

  renderResult() {
    let { file } = this.state;
    return (
      <div className="input-result">
        <img src={file.url} />
        <div className="uploader-bar">
          <div className="bar-item">
            <div className="item-box">
              <div className="item-action" onClick={this.chooseFile}>
                <div className="action-icon">
                  <Icon type="retweet" />
                </div>
                <div className="action-text">
                  替换图片
                </div>
              </div>
            </div>
          </div>
          <div className="bar-item">
            <div className="item-box">
              <div className="item-action" onClick={this.deleteFile}>
                <div className="action-icon">
                  <Icon type="delete" />
                </div>
                <div className="action-text">
                  删除图片
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleDelete() {
    let onChange = this.props.onChange || util.noop;
    this.setValueToState(undefined);
    onChange(undefined);
  }
}

export default ImageInput;
