import React from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // catch 한 에러를 케이스 분류하여 errorCase 상태에 저장
    static getDerivedStateFromError(error) {
        console.log(error)
        return { hasError: true };
    }

    // 여러 errorCase에 따른 부수 효과를 실행 시킴
    static componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return <div> error 입니다. </div>
        }
        return this.props.children;
    }
}
export default ErrorBoundary;