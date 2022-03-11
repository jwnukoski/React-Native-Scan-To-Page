// @ts-nocheck
import React, { forwardRef, useImperativeHandle } from 'react';
import { WebView } from 'react-native-webview';

class Frame extends React.Component {
    constructor(props) {
        super(props);
        
        this.webMethod = `YOUR METHOD HERE`;
        this.webPageUri = `YOUR URI HERE`;

        this.viewRef = React.createRef();
        this.sendMessageToWebview = this.sendMessageToWebview.bind(this);
        this.handleMessageFromWebview = this.handleMessageFromWebview.bind(this);

        this.jsToInject = `
            window.addEventListener('message', (e) => {
                e.data?.length > 0 ? window.${this.webMethod}(e.data) : null;
            });
            document.addEventListener('message', (e) => {
                e.data?.length > 0 ? window.${this.webMethod}(e.data) : null;
            });
        `
    }
    
    sendMessageToWebview(data) {
        if (this.viewRef.current) {
            this.viewRef.current.postMessage(data);
        }
    }

    handleMessageFromWebview(data) {
        // console.log(`\nhandleMessageFromWebview: ${JSON.stringify(data)}`)
    }

    render() {
        return (
            <WebView
                originWhitelist={['*']}
                ref={this.viewRef}
                scalesPageToFit={true}
                javaScriptEnabled
                injectedJavaScript={this.jsToInject}
                source={{ uri: this.webPageUri }}
                onMessage={this.handleMessageFromWebview}
            />
        );
    }
}

export default Frame;