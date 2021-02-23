const React = require('react');
const {dark} = require('@theme-ui/presets')
const { ThemeProvider } =require('theme-ui')
const {Provider} = require('./netlifyIdentityContext')

const newTheme = {
    ...dark ,
    sizes : { container:1024}
}

module.exports = ({element}) => (
    <Provider>
    <ThemeProvider theme={newTheme} >{element}</ThemeProvider>
    </Provider>
)