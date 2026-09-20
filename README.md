# Aplicativo Saúde & Consulta (S&C)

Projeto mobile desenvolvido utilizando React Native, Expo Go e TypeScript.

## 👥 Integrantes do Grupo
* **Kauê de Souza Marinho**

## 📌 Contexto do Projeto
O aplicativo **S&C** (Saúde & Consulta) é uma plataforma para agendamento de consultas médicas, clínicas veterinárias e consulta/compra de remédios na cidade de Recife e região.

## 📐 Diagrama de Casos de Uso
```plantuml
@startuml
left to right direction
actor Usuario as "Usuário / Paciente"

rectangle "Sistema Saúde & Consulta (S&C)" {
  usecase "Realizar Autenticação (Login/Cadastro)" as UC1
  usecase "Buscar Serviços (Médicos, Vet, Remédios)" as UC2
  usecase "Visualizar Detalhes da Clínica" as UC3
  usecase "Realizar Agendamento de Consulta" as UC4
  usecase "Gerenciar Agendamentos (Excluir/Visualizar)" as UC5
}

Usuario --> UC1
Usuario --> UC2
Usuario --> UC3
Usuario --> UC4
Usuario --> UC5
@enduml