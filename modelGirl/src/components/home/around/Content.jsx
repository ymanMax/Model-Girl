import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from 'antd-mobile';
import api from '@/api/home';
import api1 from '@/api/user';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

const showAlert = (props) => {
  const alertInstance = alert('游客', '请先登录', [
    { text: '狠心拒绝', onPress: () => console.log('cancel'), style: 'default' },
    { text: '马上登陆', onPress: () => {props.props.history.push('/user/login')} },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};


class Com extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      list: []
    }
  }
  componentWillMount(){
    this.setState({
      username: localStorage.getItem('isLogin')
    })
  }
  componentDidMount () {
    api.requestCareskin().then(data => {
      if (localStorage.getItem('isLogin')){
        api1.requestGetZan({username}).then(datas => {
          return new Promise((resolve, reject) => {
            if(datas.data.length > 0){
              data.map((ele, inde) => {
                datas.data[0].zan.map((item, index) => {
                  if(ele._id === item){
                    ele.itemNum = false
                  }
                  return ''
                })
                return ''
              })
              resolve(data)
            }else{
              resolve(data)
            }
          })
        }).then(data => {
          this.setState({
            list: data
          })
        })
      }else{
        this.setState({
          list: data
        })
      }
    })
    let username = this.state.username;
    
  }
  addClass (e, zan) {
    let username = this.state.username;
    if(localStorage.getItem('isLogin')){
      // console.log(id)
      api1.requestSetZan({username, zan}).then(() => {
        console.log('点赞成功')
      })
      e.target.id = 'active'
    } else{
      showAlert(this)
    }
  }
  
  toSearch () {
    console.log(this)
    this.props.type.history.push('/home/around/search');
  }

  render () {
    return (
      <div className='aroundContent'>
        <div className='top'>
          <SearchBar
            value={this.state.value}
            placeholder="大家都在搜“滋润肌肤之神器”"
            onSubmit={value => console.log()}
            onClear={value => console.log()}
            onFocus={this.toSearch.bind(this)}
            onBlur={() => console.log()}
            onCancel={() => console.log()}
            onChange={this.onChange}
          />
        </div>
        <ul className='cen'>
          {
            this.state.list.map((item, index) => {
              return (
                <li className='li' key={index}>
                  <Link to={'/home/around/news/' + item._id}  className='view'>
                    <img src= {item.picUrl} alt='图片丢失'/>
                  </Link>
                  <h3>{item.comment}</h3>
                  <div className='bott'>
                    <div className="left">
                      <img src='./tu.jpg' alt='图片丢失' />
                      <p>王某人王某人</p>
                    </div>
                    <div className="right">
                      <span className={ item.itemNum ? 'iconfont icon-zan ' : 'iconfont icon-zan active' } onClick={ (e) => {this.addClass(e, item._id)} }></span>
                    </div>
                  </div>
                </li>    
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Com;