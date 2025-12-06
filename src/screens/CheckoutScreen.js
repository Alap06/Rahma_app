import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import AnimatedButton from '../components/common/AnimatedButton';
import TextInputField from '../components/common/TextInputField';
import ConfettiAnimation from '../components/animations/ConfettiAnimation';
import useStore from '../store/useStore';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { total } = route.params;
  const { addOrder, cart } = useStore();
  const [step, setStep] = useState(1); // 1: Infos, 2: Paiement, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const isInfoComplete = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.zipCode
    );
  };

  const isPaymentComplete = () => {
    return (
      paymentData.cardNumber &&
      paymentData.cardHolder &&
      paymentData.expiryDate &&
      paymentData.cvv
    );
  };

  const handleProceed = async () => {
    if (step === 1 && isInfoComplete()) {
      setStep(2);
    } else if (step === 2 && isPaymentComplete()) {
      setLoading(true);
      setTimeout(() => {
        const order = {
          items: cart,
          total,
          customer: formData,
          payment: 'card',
        };
        addOrder(order);
        setLoading(false);
        setShowConfetti(true);
        setStep(3);
      }, 1500);
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={styles.progressItemContainer}>
          <View
            style={[
              styles.progressDot,
              s <= step && styles.progressDotActive,
            ]}
          >
            {s < step && (
              <FontAwesome name="check" size={12} color="#FFFFFF" />
            )}
            {s === step && <Text style={styles.progressText}>{s}</Text>}
            {s > step && <Text style={styles.progressText}>{s}</Text>}
          </View>
          <Text style={styles.progressLabel}>
            {s === 1 ? 'Infos' : s === 2 ? 'Paiement' : 'Confirmation'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderStepOne = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Adresse de livraison</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <TextInputField
            label="Prénom"
            placeholder="Jean"
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            containerStyle={{ flex: 1 }}
          />
          <TextInputField
            label="Nom"
            placeholder="Dupont"
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <TextInputField
          label="Email"
          placeholder="jean@example.com"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        <TextInputField
          label="Téléphone"
          placeholder="+33 6 12 34 56 78"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          keyboardType="phone-pad"
        />
        <TextInputField
          label="Adresse"
          placeholder="123 Rue de Paris"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <View style={styles.row}>
          <TextInputField
            label="Ville"
            placeholder="Paris"
            value={formData.city}
            onChangeText={(text) => handleInputChange('city', text)}
            containerStyle={{ flex: 1 }}
          />
          <TextInputField
            label="Code Postal"
            placeholder="75001"
            value={formData.zipCode}
            onChangeText={(text) => handleInputChange('zipCode', text)}
            keyboardType="number-pad"
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );

  const renderStepTwo = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Détails de paiement</Text>
      
      {/* Payment Methods */}
      <View style={styles.paymentMethods}>
        {['card', 'paypal', 'apple-pay'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentMethod,
              paymentData.method === method && styles.paymentMethodActive,
            ]}
            onPress={() => handlePaymentChange('method', method)}
          >
            <FontAwesome
              name={method === 'card' ? 'credit-card' : method === 'paypal' ? 'paypal' : 'apple'}
              size={20}
              color={paymentData.method === method ? COLORS.primary : COLORS.gray}
            />
            <Text
              style={[
                styles.paymentMethodText,
                paymentData.method === method && styles.paymentMethodTextActive,
              ]}
            >
              {method === 'card' ? 'Carte' : method === 'paypal' ? 'PayPal' : 'Apple Pay'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Numéro de carte"
          placeholder="4532 1234 5678 9010"
          value={paymentData.cardNumber}
          onChangeText={(text) => handlePaymentChange('cardNumber', text)}
          keyboardType="number-pad"
        />
        <TextInputField
          label="Titulaire de la carte"
          placeholder="JEAN DUPONT"
          value={paymentData.cardHolder}
          onChangeText={(text) => handlePaymentChange('cardHolder', text)}
        />
        <View style={styles.row}>
          <TextInputField
            label="Date d'expiration"
            placeholder="MM/YY"
            value={paymentData.expiryDate}
            onChangeText={(text) => handlePaymentChange('expiryDate', text)}
            containerStyle={{ flex: 1 }}
          />
          <TextInputField
            label="CVV"
            placeholder="123"
            value={paymentData.cvv}
            onChangeText={(text) => handlePaymentChange('cvv', text)}
            keyboardType="number-pad"
            secureTextEntry
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Montant total</Text>
          <Text style={styles.summaryAmount}>{formatPrice(total)}</Text>
        </View>
        <Text style={styles.summaryNote}>Paiement sécurisé</Text>
      </View>
    </View>
  );

  const renderStepThree = () => (
    <View style={styles.stepContainer}>
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationIcon}>✅</Text>
        <Text style={styles.confirmationTitle}>Commande confirmée!</Text>
        <Text style={styles.confirmationText}>
          Merci pour votre achat. Un email de confirmation a été envoyé à {formData.email}.
        </Text>

        <View style={styles.orderNumber}>
          <Text style={styles.orderNumberLabel}>Numéro de commande</Text>
          <Text style={styles.orderNumberValue}>ORDER-{Date.now().toString().slice(-6)}</Text>
        </View>

        <View style={styles.deliveryInfo}>
          <FontAwesome name="truck" size={24} color={COLORS.secondary} />
          <View>
            <Text style={styles.deliveryTitle}>Livraison estimée</Text>
            <Text style={styles.deliveryTime}>2-3 jours ouvrables</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Confetti */}
      {showConfetti && <ConfettiAnimation particleCount={80} duration={2000} isActive={showConfetti} />}

      {/* Header */}
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={styles.backButton}
          >
            <FontAwesome name="chevron-left" size={20} color={COLORS.dark} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Paiement</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </ScrollView>

      {/* Footer */}
      {step < 3 && (
        <View style={styles.footer}>
          {step === 2 && (
            <AnimatedButton
              label="Retour"
              onPress={() => setStep(1)}
              variant="outline"
              size="lg"
              style={{ marginBottom: SPACING.md }}
              fullWidth
            />
          )}
          <AnimatedButton
            label={step === 1 ? 'Continuer' : 'Payer'}
            onPress={handleProceed}
            loading={loading}
            disabled={step === 1 ? !isInfoComplete() : !isPaymentComplete()}
            variant="primary"
            size="lg"
            fullWidth
          />
        </View>
      )}

      {step === 3 && (
        <View style={styles.footer}>
          <AnimatedButton
            label="Retour à l'accueil"
            onPress={() => navigation.replace('Main')}
            variant="primary"
            size="lg"
            fullWidth
          />
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  progressItemContainer: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  progressText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 200,
  },
  stepContainer: {
    marginBottom: SPACING.xl,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.lg,
    fontFamily: 'Poppins',
  },
  form: {
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  paymentMethod: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  paymentMethodActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 102, 255, 0.05)',
  },
  paymentMethodText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  paymentMethodTextActive: {
    color: COLORS.primary,
  },
  orderSummary: {
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: 'Poppins',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  summaryNote: {
    fontSize: 11,
    color: COLORS.success,
    marginTop: SPACING.md,
    fontFamily: 'Poppins',
  },
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  confirmationIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins',
  },
  confirmationText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
    fontFamily: 'Poppins',
  },
  orderNumber: {
    backgroundColor: COLORS.light,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  orderNumberLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    fontFamily: 'Poppins',
  },
  orderNumberValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    width: '100%',
    gap: SPACING.md,
  },
  deliveryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  deliveryTime: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'Poppins',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default CheckoutScreen;
