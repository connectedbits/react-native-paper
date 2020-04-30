import color from 'color';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import { Theme } from '../../types';
import Divider from '../Divider';
import Text from '../Typography/Text';

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Title to show as the header for the section.
   */
  title?: string | JSX.Element;
  /**
   * Number of lines to display for text, defaults to 1.
   */
  numberOfLines?: number;
  /**
   * Content of the `Drawer.Section`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

/**
 * A component to group content inside a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   state = {
 *     active: 'first',
 *   };
 *
 *   render() {
 *     const { active } = this.state;
 *
 *     return (
 *       <Drawer.Section title="Some title">
 *         <Drawer.Item
 *           label="First Item"
 *           active={active === 'first'}
 *           onPress={() => { this.setState({ active: 'first' }); }}
 *         />
 *         <Drawer.Item
 *           label="Second Item"
 *           active={active === 'second'}
 *           onPress={() => { this.setState({ active: 'second' }); }}
 *         />
 *      </Drawer.Section>
 *     );
 *   }
 * }
 * ```
 */
class DrawerSection extends React.Component<Props> {
  static displayName = 'Drawer.Section';

  static titleElement(
    title: Props['title'],
    theme: Props['theme'],
    numberOfLines: Props['numberOfLines']
  ) {
    const { colors, fonts } = theme;
    const titleColor = color(colors.text)
      .alpha(0.54)
      .rgb()
      .string();
    const font = fonts.medium;
    const numLines = typeof numberOfLines === 'undefined' ? 1 : numberOfLines;
    return (
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={numLines}
          style={{ color: titleColor, ...font, marginLeft: 16 }}
        >
          {title}
        </Text>
      </View>
    );
  }

  render() {
    const {
      children,
      title,
      theme,
      style,
      numberOfLines,
      ...rest
    } = this.props;
    let titleElement;
    if (title) {
      if (typeof title === 'string') {
        titleElement = DrawerSection.titleElement(title, theme, numberOfLines);
      } else {
        titleElement = title;
      }
    }

    return (
      <View style={[styles.container, style]} {...rest}>
        {titleElement}
        {children}
        <Divider style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  titleContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  divider: {
    marginTop: 4,
  },
});

export default withTheme(DrawerSection);
