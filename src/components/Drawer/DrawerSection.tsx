import color from 'color';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
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
  theme: ReactNativePaper.Theme;
};

/**
 * A component to group content inside a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/drawer-section.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [active, setActive] = React.useState('');
 *
 *
 *   return (
 *     <Drawer.Section title="Some title">
 *       <Drawer.Item
 *         label="First Item"
 *         active={active === 'first'}
 *         onPress={() => setActive('first')}
 *       />
 *       <Drawer.Item
 *         label="Second Item"
 *         active={active === 'second'}
 *         onPress={() => setActive('second')}
 *       />
 *     </Drawer.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DrawerSection = ({
  children,
  title,
  theme,
  style,
  numberOfLines,
  ...rest
}: Props) => {
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
};

DrawerSection.titleElement = (
  title: Props['title'],
  theme: Props['theme'],
  numberOfLines: Props['numberOfLines']
) => {
  const { colors, fonts } = theme;
  const titleColor = color(colors.text).alpha(0.54).rgb().string();
  const font = fonts.medium;
  const numLines = typeof numberOfLines === 'undefined' ? 1 : numberOfLines;
  return (
    <View style={styles.titleContainer}>
      <Text
        numberOfLines={numLines}
        style={[{ color: titleColor, ...font }, styles.title]}
      >
        {title}
      </Text>
    </View>
  );
};
DrawerSection.displayName = 'Drawer.Section';

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  titleContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 16,
  },
  divider: {
    marginTop: 4,
  },
});

export default withTheme(DrawerSection);
