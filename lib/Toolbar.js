import React, {
    Component,
    StyleSheet,
    PropTypes,
    View,
    Text
} from 'react-native';
import { TYPO, PRIMARY, COLOR } from './config';
import Icon from './Icon';
import IconButton from './IconButton';

const typos = StyleSheet.create(TYPO);

/**
 * Toolbar Component
 */
export default class Toolbar extends Component {
    /**
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        theme: 'dark',
        primary: PRIMARY
    };
    static propTypes = {
        theme: PropTypes.string,
        primary: PropTypes.string,
        navIconName: PropTypes.string,
        onIconClicked: PropTypes.func,
        title: PropTypes.string,
        titleColor: PropTypes.string,
        actions: PropTypes.array
    };
    state = {};

    render = () => {
        var {
            title,
            theme,
            primary,
            titleColor,
            navIconName,
            onIconClicked,
            actions
            } = this.props;

        var themeMap = {
            light: {
                backgroundColor: '#fff',
                color: 'rgba(0,0,0,.87)',
                iconColor: 'rgba(0,0,0,.54)',
            },
            dark: {
                backgroundColor: COLOR[`${primary}500`].color,
                color: '#rgba(255,255,255,.87)',
                iconColor: 'rgba(255,255,255,.87)',
            }
        }

        var themeStyle = themeMap[theme];
        return (
            <View style={[
                styles.toolbar,{backgroundColor :themeStyle.backgroundColor}]}>
                {
                    navIconName && (
                        <IconButton onPressButton={onIconClicked}>
                            <Icon name={navIconName || "menu"}
                                  size={24}
                                  color={themeStyle.iconColor}
                                  style={styles.icon}/>
                        </IconButton>
                    )
                }
                <Text style={[
                    styles.title,
                    TYPO.paperFontTitle,
                    {
                        color: themeStyle.color,
                        marginLeft: navIconName ? styles.title.marginLeft : 56
                    }
                ]}>{title}</Text>
                {
                    actions &&
                    actions.map(function(action) {
                        return (
                            <IconButton key={action.icon} onPressButton={action.onPress}>
                                <Icon name={action.icon}
                                      size={24}
                                      color={themeStyle.iconColor}
                                      style={styles.icon}/>
                            </IconButton>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        marginLeft: 16
    },
    icon: {
        margin: 16,
    }
});