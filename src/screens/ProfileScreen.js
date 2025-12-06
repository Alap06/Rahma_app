import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import useStore from '../store/useStore';

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme, orders } = useStore();

  const stats = [
    { label: 'Commandes', value: orders.length, icon: 'shopping-bag' },
    { label: 'Dépensé', value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: 'dollar' },
    { label: 'Depuis', value: 'Mars 2024', icon: 'calendar' },
  ];

  const menuItems = [
    { label: 'Commandes', icon: 'history', onPress: () => {} },
    { label: 'Adresses', icon: 'map-marker', onPress: () => {} },
    { label: 'Paiements', icon: 'credit-card', onPress: () => {} },
    { label: 'Favoris', icon: 'heart', onPress: () => navigation.navigate('Favorites') },
    { label: 'Paramètres', icon: 'cog', onPress: () => {} },
    { label: 'Aide', icon: 'question-circle', onPress: () => {} },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={20} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Profil</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍💼</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jean Dupont</Text>
            <Text style={styles.profileEmail}>jean@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <FontAwesome name="pencil" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <FontAwesome name={stat.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <FontAwesome name={item.icon} size={18} color={COLORS.primary} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <FontAwesome name="chevron-right" size={14} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Toggle */}
        <View style={styles.themeSection}>
          <View style={styles.themeHeader}>
            <FontAwesome name="moon-o" size={18} color={COLORS.primary} />
            <Text style={styles.themeLabel}>Mode sombre</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={isDarkMode ? COLORS.primary : COLORS.light}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={18} color="#FF4444" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>FitPulse Store v1.0.0</Text>
          <Text style={styles.footerLink}>Conditions d'utilisation</Text>
          <Text style={styles.footerLink}>Politique de confidentialité</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
    fontFamily: 'Poppins',
  },
  profileEmail: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
    fontFamily: 'Poppins',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  menuSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  menuItemText: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  themeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: RADIUS.md,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4444',
    fontFamily: 'Poppins',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  footerLink: {
    fontSize: 11,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
});

export default ProfileScreen;
