import React from 'react'

function Layout(props) {
    return(
       <html>
        <head>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
            <link rel="stylesheet" href={`${props.domain}/styles.css`} />
        </head>
        <body>
            <div
                id="render-target"
                dangerouslySetInnerHTML={{
                    __html: props.content
                }}
            >
            </div>
        <script src={`${props.domain}/app.js`} />
        </body>
       </html>
    )
}

export default Layout