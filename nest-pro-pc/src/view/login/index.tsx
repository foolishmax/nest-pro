import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { useTitle } from 'ahooks';
import { Tabs, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constants';
import { LOGIN, SEND_CODE_MSG } from '../../graphql/auth';
import styles from './index.module.less';

interface IValue {
  phone: string;
  code: string;
  autoLogin: boolean;
}

const Login = () => {
  const [sendCodeMsg] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [params] = useSearchParams();
  // const { store } = useUserContext();
  const navigate = useNavigate();
  useTitle('登录');

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      // store.refetchHandler();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      navigate(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };
  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{ phone: '17839238512' }}
        onFinish={loginHandler}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      >
        <Tabs
          centered
          items={[
            {
              key: 'phone',
              label: '手机号登录',
            },
          ]}
        />
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="phone"
            placeholder="默认手机号为17839238512"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName="phone"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (phone: string) => {
              const res = await sendCodeMsg({
                variables: {
                  phone,
                },
              });
              console.log('res', res);
              if (res.data.sendCodeMsg.code === 200) {
                message.success(res.data.sendCodeMsg.message);
              } else {
                message.error(res.data.sendCodeMsg.message);
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
