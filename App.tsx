import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Interface do modelo de dados do Agendamento
type Appointment = {
  id: string;
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  price: string;
  address: string;
};

export default function App() {
  // Controle de Navegação entre Telas
  const [currentScreen, setCurrentScreen] = useState<string>('Splash');

  // Estados de Autenticação (Login / Cadastro)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Estados para Seleção de Serviços e Agendamento
  const [selectedCategory, setSelectedCategory] = useState<'Medico' | 'Vet' | 'Remedios'>('Medico');
  const [selectedDate, setSelectedDate] = useState('25/09/2026');
  const [selectedTime, setSelectedTime] = useState('14:30');

  // Estado da Lista de Agendamentos (Dinâmico)
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Consulta Dr. Pedro Souza',
      clinic: 'Clínica Santo Antônio',
      date: '25/09/2026',
      time: '14:30',
      price: 'R$ 250,00',
      address: 'Av. Boa Viagem, 1780 - Recife Pernambuco'
    },
    {
      id: '2',
      doctor: 'Consulta Dra. Maria',
      clinic: 'Clínica Veterinária AniVet',
      date: '16/10/2026',
      time: '15:30',
      price: 'R$ 170,00',
      address: 'Av. Manoel Quintino Tavares, 79 - Recife Pernambuco'
    }
  ]);

  // Função para Excluir Agendamento
  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(item => item.id !== id));
    Alert.alert("Agendamento", "O agendamento foi cancelado com sucesso.");
  };

  // Função para Adicionar um Novo Agendamento
  const handleConfirmBooking = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctor: selectedCategory === 'Medico' ? 'Consulta Dr. Pedro Souza' : 'Consulta Dra. Maria',
      clinic: selectedCategory === 'Medico' ? 'Clínica Santo Antônio' : 'Clínica Veterinária AniVet',
      date: selectedDate,
      time: selectedTime,
      price: selectedCategory === 'Medico' ? 'R$ 250,00' : 'R$ 170,00',
      address: selectedCategory === 'Medico' ? 'Av. Boa Viagem, 1780 - Recife' : 'Av. Manoel Quintino Tavares, 79 - Recife'
    };

    setAppointments([...appointments, newAppointment]);
    Alert.alert("Sucesso!", "Seu agendamento foi confirmado!");
    setCurrentScreen('Appointments');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00B49F" />

      {/* ---------------- TELA 1: SPLASH SCREEN ---------------- */}
      {currentScreen === 'Splash' && (
        <View style={styles.splashContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="add" size={54} color="#FF6B6B" />
          </View>
          <Text style={styles.splashTitle}>S&C</Text>
          <Text style={styles.splashSubtitle}>Saúde & Consulta</Text>
          <TouchableOpacity 
            style={styles.splashButton} 
            onPress={() => setCurrentScreen('Login')}
          >
            <Text style={styles.splashButtonText}>Acessar o App</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ---------------- TELA 2: LOGIN ---------------- */}
      {currentScreen === 'Login' && (
        <View style={styles.authContainer}>
          <Text style={styles.authHeaderTitle}>S&C</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail:"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha:"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setCurrentScreen('Home')}
          >
            <Text style={styles.primaryButtonText}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('Register')}>
            <Text style={styles.linkText}>Não tem uma conta? Toque aqui para criar uma</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ---------------- TELA 3: CADASTRO ---------------- */}
      {currentScreen === 'Register' && (
        <View style={styles.authContainer}>
          <Text style={styles.authHeaderTitle}>Criar Conta</Text>
          <TextInput style={styles.input} placeholder="Nome Completo:" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="E-mail:" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Senha:" secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmar Senha:" secureTextEntry />
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setCurrentScreen('Home')}
          >
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
            <Text style={styles.linkText}>Já possui uma conta? Fazer Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BARRA DE NAVEGAÇÃO SUPERIOR FIXA (Nas telas logadas) */}
      {['Home', 'ClinicDetails', 'Booking', 'Appointments', 'Medicines'].includes(currentScreen) && (
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
            <Text style={styles.navLogo}>+ S&C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('Appointments')}>
            <Ionicons name="calendar" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* ---------------- TELA 4: HOME / BUSCA ---------------- */}
      {currentScreen === 'Home' && (
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Agende as suas consultas</Text>
          <Text style={styles.subText}>Qual cidade você está?</Text>
          <TextInput style={styles.input} defaultValue="Recife - PE" />

          {/* Botões de Categorias */}
          <View style={styles.categoryRow}>
            <TouchableOpacity 
              style={[styles.categoryCard, selectedCategory === 'Medico' && styles.selectedCategory]}
              onPress={() => setSelectedCategory('Medico')}
            >
              <Ionicons name="medkit-outline" size={28} color={selectedCategory === 'Medico' ? '#00B49F' : '#666'} />
              <Text style={{ marginTop: 5, color: selectedCategory === 'Medico' ? '#00B49F' : '#333' }}>Médico</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.categoryCard, selectedCategory === 'Vet' && styles.selectedCategory]}
              onPress={() => setSelectedCategory('Vet')}
            >
              <Ionicons name="paw-outline" size={28} color={selectedCategory === 'Vet' ? '#00B49F' : '#666'} />
              <Text style={{ marginTop: 5, color: selectedCategory === 'Vet' ? '#00B49F' : '#333' }}>Veterinário</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => setCurrentScreen('Medicines')}
            >
              <Ionicons name="bandage-outline" size={28} color="#666" />
              <Text style={{ marginTop: 5, color: '#333' }}>Remédios</Text>
            </TouchableOpacity>
          </View>

          {/* Resultado das Clínicas */}
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'Medico' ? 'Clínicas Médicas' : 'Clínicas Veterinárias'}
          </Text>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => setCurrentScreen('ClinicDetails')}
          >
            <Text style={styles.cardTitle}>
              {selectedCategory === 'Medico' ? 'Clínica Santo Antônio' : 'Clínica Veterinária AniVet'}
            </Text>
            <Text style={styles.cardSubtitle}>
              {selectedCategory === 'Medico' 
                ? 'Av. Boa Viagem, 1780 - Recife Pernambuco' 
                : 'Av. Manoel Quintino Tavares, 79 - Recife Pernambuco'}
            </Text>
            <Text style={styles.cardPhone}>
              {selectedCategory === 'Medico' ? '(81) 9700-0000' : '(81) 9400-0000'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ---------------- TELA 5: DETALHES DA CLÍNICA ---------------- */}
      {currentScreen === 'ClinicDetails' && (
        <ScrollView style={styles.content}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setCurrentScreen('Home')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            {selectedCategory === 'Medico' ? 'Clínica Santo Antônio' : 'Clínica Veterinária AniVet'}
          </Text>
          <Text style={styles.subText}>
            {selectedCategory === 'Medico' 
              ? 'Av. Boa Viagem, 1780 - Recife Pernambuco' 
              : 'Av. Manoel Quintino Tavares, 79 - Recife Pernambuco'}
          </Text>
          
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Serviços Disponíveis</Text>
          
          <View style={styles.serviceCard}>
            <View>
              <Text style={styles.serviceName}>
                {selectedCategory === 'Medico' ? 'Consulta Dr. Pedro Souza' : 'Consulta Dra. Maria'}
              </Text>
              <Text style={styles.servicePrice}>
                {selectedCategory === 'Medico' ? 'R$ 250,00' : 'R$ 170,00'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.smallButton}
              onPress={() => setCurrentScreen('Booking')}
            >
              <Text style={styles.smallButtonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ---------------- TELA 6: AGENDAMENTO ---------------- */}
      {currentScreen === 'Booking' && (
        <ScrollView style={styles.content}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setCurrentScreen('ClinicDetails')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Fazer um Agendamento</Text>
          <Text style={styles.subText}>Selecione o dia e horário preferido:</Text>

          {/* Seleção de Datas */}
          <View style={styles.calendarSim}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Setembro 2026</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {['24', '25', '26', '27'].map((day) => {
                const fullDate = `${day}/09/2026`;
                const isSelected = selectedDate === fullDate;
                return (
                  <TouchableOpacity 
                    key={day} 
                    style={[styles.dayBox, isSelected && styles.selectedDay]}
                    onPress={() => setSelectedDate(fullDate)}
                  >
                    <Text style={{ color: isSelected ? '#FFF' : '#333', fontWeight: 'bold' }}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Seleção de Horários */}
          <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
          <View style={styles.timeRow}>
            {['14:30', '15:00', '15:30', '16:00'].map((time) => (
              <TouchableOpacity 
                key={time} 
                style={[styles.timeBox, selectedTime === time && styles.selectedTime]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={{ color: selectedTime === time ? '#FFF' : '#333' }}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { marginTop: 30 }]}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.primaryButtonText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ---------------- TELA 7: MEUS AGENDAMENTOS ---------------- */}
      {currentScreen === 'Appointments' && (
        <ScrollView style={styles.content}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setCurrentScreen('Home')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Meus Agendamentos</Text>

          {appointments.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#777' }}>Nenhum agendamento ativo.</Text>
          ) : (
            appointments.map((item) => (
              <View key={item.id} style={styles.appointmentCard}>
                <Text style={styles.cardTitle}>{item.doctor}</Text>
                <Text style={{ color: '#555' }}>{item.clinic}</Text>
                <Text style={{ marginVertical: 4 }}>📅 Data: {item.date} às {item.time}</Text>
                <Text style={{ fontWeight: 'bold', color: '#00B49F' }}>Valor: {item.price}</Text>
                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>📍 {item.address}</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, { backgroundColor: '#FF6B6B' }]}
                    onPress={() => handleDeleteAppointment(item.id)}
                  >
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* ---------------- TELA 8: COMPRA DE REMÉDIOS ---------------- */}
      {currentScreen === 'Medicines' && (
        <ScrollView style={styles.content}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setCurrentScreen('Home')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Pesquisar Remédios</Text>

          {[
            { name: 'Tylenol 750mg, 20 comprimidos', price: 'R$ 18,90' },
            { name: 'Luftal 40mg, 20 comprimidos', price: 'R$ 29,05' },
            { name: 'Atroveran gotas 30ml', price: 'R$ 14,09' },
            { name: 'Buscopan Composto, 20 comp.', price: 'R$ 49,16' }
          ].map((med, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.serviceName}>{med.name}</Text>
                <Text style={styles.servicePrice}>{med.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.smallButton} 
                onPress={() => Alert.alert("Farmácia", `${med.name} foi adicionado ao carrinho!`)}
              >
                <Text style={styles.smallButtonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// ---------------- ESTILOS VISUAIS ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#00B49F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#E0F2F1',
    marginBottom: 40,
  },
  splashButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
  },
  splashButtonText: {
    color: '#00B49F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  authContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  authHeaderTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00B49F',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  primaryButton: {
    backgroundColor: '#00B49F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#00B49F',
    textAlign: 'center',
    marginTop: 18,
  },
  topNav: {
    backgroundColor: '#00B49F',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#222',
  },
  subText: {
    color: '#666',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedCategory: {
    borderColor: '#00B49F',
    backgroundColor: '#E0F2F1',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  cardSubtitle: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  cardPhone: {
    color: '#00B49F',
    marginTop: 6,
    fontWeight: 'bold',
  },
  serviceCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  servicePrice: {
    color: '#00B49F',
    fontWeight: 'bold',
    marginTop: 4,
  },
  smallButton: {
    backgroundColor: '#00B49F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  smallButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  calendarSim: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  dayBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  selectedDay: {
    backgroundColor: '#00B49F',
    borderColor: '#00B49F',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeBox: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  selectedTime: {
    backgroundColor: '#00B49F',
    borderColor: '#00B49F',
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00B49F',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
