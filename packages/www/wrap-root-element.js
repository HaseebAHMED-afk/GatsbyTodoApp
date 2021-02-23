const React = require('react');
const {dark} = require('@theme-ui/presets')
const { ThemeProvider } =require('theme-ui')

const newTheme = {
    ...dark ,
    sizes : { container:1024}
}

module.exports = ({element}) => (
    <ThemeProvider theme={newTheme} >{element}</ThemeProvider>
)