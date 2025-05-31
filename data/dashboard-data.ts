import type { DashboardData } from "../types/dashboard"

export const dashboardData: DashboardData = {
  eficiencia_assistencial: {
    reinternacao_30_dias: {
      total_pacientes: 4000,
      reinternacoes: 480,
      percentual: 12,
      meta: 10,
    },
    alta_antecipada: {
      potencial_alta: 340,
      percentual: 8.5,
      meta: 7,
    },
    internacao_domiciliar: {
      elegiveis: 200,
      percentual: 5,
      meta: 4,
    },
    permanencia_prolongada: {
      casos: 600,
      percentual: 15,
      meta: 13,
    },
    tempo_medio_internacao: {
      previsto: 4.3,
      meta: 4,
    },
    evolucao_mensal_permanencia: [
      { mes: "Jan", percentual: 16 },
      { mes: "Fev", percentual: 15 },
      { mes: "Mar", percentual: 14 },
    ],
  },
  gestao_de_custos: {
    custo_medio_por_hospital: [
      {
        hospital: "Hospital A",
        previsto: 12500,
        real: 13200,
        eficiencia_percentual: -5.6,
      },
      {
        hospital: "Hospital B",
        previsto: 10000,
        real: 9800,
        eficiencia_percentual: 2,
      },
      {
        hospital: "Hospital C",
        previsto: 15000,
        real: 15500,
        eficiencia_percentual: -3.3,
      },
    ],
    custo_total_mensal: [
      { mes: "Jan", previsto: 6500000, real: 6700000, desvio_percentual: 3 },
      { mes: "Fev", previsto: 6800000, real: 6600000, desvio_percentual: -2.9 },
      { mes: "Mar", previsto: 7000000, real: 7100000, desvio_percentual: 1.4 },
    ],
    eficiencia_ajustada_case_mix: [
      { hospital: "Hospital A", eficiencia: 82 },
      { hospital: "Hospital B", eficiencia: 91 },
      { hospital: "Hospital C", eficiencia: 85 },
    ],
    distribuicao_custos_por_tipo: [
      { tipo: "UTI", percentual: 45 },
      { tipo: "Enfermaria", percentual: 30 },
      { tipo: "Internacao Domiciliar", percentual: 15 },
      { tipo: "Outros", percentual: 10 },
    ],
  },
  gestao_de_riscos: {
    internacoes_alto_custo_por_cid: [
      { cid: "Cirurgia Cardíaca", percentual: 40 },
      { cid: "Oncologia", percentual: 35 },
      { cid: "Ortopedia", percentual: 20 },
      { cid: "Clínica Geral", percentual: 10 },
    ],
    eventos_adversos: [
      { tipo: "Infecção Hospitalar", percentual: 45 },
      { tipo: "Reação Medicamentosa", percentual: 30 },
      { tipo: "Erro de Procedimento", percentual: 25 },
    ],
    criticidade_por_cid: [
      { cid: "Cirurgia Cardíaca", criticidade_alta_percentual: 70 },
      { cid: "Oncologia", criticidade_alta_percentual: 65 },
      { cid: "Ortopedia", criticidade_alta_percentual: 30 },
      { cid: "Clínica Geral", criticidade_alta_percentual: 15 },
    ],
  },
  auditoria_e_compliance: {
    desvio_faturamento_por_hospital: [
      {
        hospital: "Hospital A",
        previsto: 12000000,
        real: 12900000,
        anomalia_percentual: 7.5,
      },
      {
        hospital: "Hospital B",
        previsto: 10000000,
        real: 10100000,
        anomalia_percentual: 1,
      },
      {
        hospital: "Hospital C",
        previsto: 15000000,
        real: 15500000,
        anomalia_percentual: 3.3,
      },
    ],
    tipos_de_anomalias: [
      { tipo: "Procedimentos não realizados", percentual: 40 },
      { tipo: "Cobrança duplicada", percentual: 35 },
      { tipo: "Materiais não utilizados", percentual: 25 },
    ],
    evolucao_desvios_faturamento: [
      { mes: "Jan", percentual: 5 },
      { mes: "Fev", percentual: 4 },
      { mes: "Mar", percentual: 6 },
    ],
  },
}

// Novos dados para os gráficos específicos
export const newDashboardData = {
  // Previsões e Riscos
  previsao_reinternacao: [
    { periodo: "Sem 1", previsto: 12, real: 14 },
    { periodo: "Sem 2", previsto: 15, real: 13 },
    { periodo: "Sem 3", previsto: 18, real: 16 },
    { periodo: "Sem 4", previsto: 22, real: 25 },
    { periodo: "Sem 5", previsto: 19, real: 21 },
    { periodo: "Sem 6", previsto: 16, real: 18 },
    { periodo: "Sem 7", previsto: 14, real: 12 },
    { periodo: "Sem 8", previsto: 17, real: 19 },
  ],

  desospitalizacao: [
    { unidade: "UTI Geral", pacientes: 45 },
    { unidade: "Cardiologia", pacientes: 32 },
    { unidade: "Neurologia", pacientes: 28 },
    { unidade: "Ortopedia", pacientes: 38 },
    { unidade: "Oncologia", pacientes: 25 },
    { unidade: "Pediatria", pacientes: 18 },
  ],

  elegibilidade_domiciliar: [
    { categoria: "Elegíveis", valor: 35, cor: "#1e40af" },
    { categoria: "Não Elegíveis", valor: 65, cor: "#93c5fd" },
  ],

  risco_evento_adverso: [
    { setor: "UTI", iatrogênico: 8, clínico: 12, infeccioso: 15 },
    { setor: "Cardiologia", iatrogênico: 5, clínico: 8, infeccioso: 6 },
    { setor: "Neurologia", iatrogênico: 6, clínico: 10, infeccioso: 4 },
    { setor: "Ortopedia", iatrogênico: 3, clínico: 5, infeccioso: 3 },
    { setor: "Oncologia", iatrogênico: 7, clínico: 9, infeccioso: 8 },
    { setor: "Pediatria", iatrogênico: 2, clínico: 4, infeccioso: 5 },
  ],

  // Custos e Auditoria
  custo_por_paciente: [
    { diagnostico: "Cardíaco", q1: 8000, mediana: 12000, q3: 18000, outliers: [25000, 30000, 35000] },
    { diagnostico: "Neurológico", q1: 6000, mediana: 10000, q3: 15000, outliers: [22000, 28000] },
    { diagnostico: "Ortopédico", q1: 4000, mediana: 7000, q3: 11000, outliers: [18000, 20000] },
    { diagnostico: "Oncológico", q1: 15000, mediana: 25000, q3: 40000, outliers: [55000, 60000, 70000] },
  ],

  custo_total_atendimento: [
    { mes: "Jan", exames: 450000, internacao: 1200000, medicacao: 380000 },
    { mes: "Fev", exames: 520000, internacao: 1350000, medicacao: 420000 },
    { mes: "Mar", exames: 480000, internacao: 1280000, medicacao: 390000 },
    { mes: "Abr", exames: 510000, internacao: 1320000, medicacao: 410000 },
    { mes: "Mai", exames: 490000, internacao: 1290000, medicacao: 400000 },
    { mes: "Jun", exames: 530000, internacao: 1380000, medicacao: 430000 },
  ],

  anomalias_faturamento: [
    { esperado: 10000, observado: 10200, hospital: "A" },
    { esperado: 15000, observado: 14800, hospital: "B" },
    { esperado: 12000, observado: 18000, hospital: "C" },
    { esperado: 8000, observado: 8100, hospital: "D" },
    { esperado: 20000, observado: 19500, hospital: "E" },
    { esperado: 14000, observado: 25000, hospital: "F" },
    { esperado: 16000, observado: 16300, hospital: "G" },
    { esperado: 11000, observado: 10900, hospital: "H" },
    { esperado: 13000, observado: 22000, hospital: "I" },
    { esperado: 9000, observado: 9200, hospital: "J" },
  ],

  // Gestão Hospitalar / Eficiência
  tempo_internacao: [
    { periodo: "Sem 1", mediana: 4.2, min: 3.8, max: 4.6 },
    { periodo: "Sem 2", mediana: 4.5, min: 4.1, max: 4.9 },
    { periodo: "Sem 3", mediana: 4.1, min: 3.7, max: 4.5 },
    { periodo: "Sem 4", mediana: 4.8, min: 4.4, max: 5.2 },
    { periodo: "Sem 5", mediana: 4.3, min: 3.9, max: 4.7 },
    { periodo: "Sem 6", mediana: 4.6, min: 4.2, max: 5.0 },
  ],

  alto_risco_custo: [
    { name: "Cirurgia Cardíaca", size: 2500000, complexity: "Alta" },
    { name: "Oncologia", size: 2200000, complexity: "Alta" },
    { name: "Neurologia", size: 1800000, complexity: "Média" },
    { name: "Ortopedia", size: 1200000, complexity: "Média" },
    { name: "UTI Geral", size: 3000000, complexity: "Alta" },
    { name: "Pediatria", size: 800000, complexity: "Baixa" },
    { name: "Clínica Médica", size: 1000000, complexity: "Baixa" },
  ],

  eficiencia_case_mix: [
    { prestador: "Hospital A", qualidade: 85, custo: 78, tempo: 82, satisfacao: 88, eficiencia: 80 },
    { prestador: "Hospital B", qualidade: 92, custo: 85, tempo: 90, satisfacao: 85, eficiencia: 88 },
    { prestador: "Hospital C", qualidade: 78, custo: 92, tempo: 75, satisfacao: 80, eficiencia: 81 },
    { prestador: "Hospital D", qualidade: 88, custo: 80, tempo: 85, satisfacao: 90, eficiencia: 86 },
  ],

  criticidade_cid: [
    { cid: "Cardíaco", leve: 20, moderado: 35, grave: 45 },
    { cid: "Neurológico", leve: 15, moderado: 40, grave: 45 },
    { cid: "Oncológico", leve: 10, moderado: 25, grave: 65 },
    { cid: "Ortopédico", leve: 45, moderado: 35, grave: 20 },
    { cid: "Respiratório", leve: 25, moderado: 45, grave: 30 },
  ],

  // Tabela de Drill-Down
  pacientes_detalhes: [
    { id: 1, paciente: "João Silva", diagnostico: "I21.9 - IAM", score: 85, unidade: "UTI", custo: 25000, tempo: 7 },
    {
      id: 2,
      paciente: "Maria Santos",
      diagnostico: "C78.0 - Neoplasia",
      score: 92,
      unidade: "Oncologia",
      custo: 45000,
      tempo: 12,
    },
    {
      id: 3,
      paciente: "Pedro Costa",
      diagnostico: "S72.0 - Fratura",
      score: 65,
      unidade: "Ortopedia",
      custo: 18000,
      tempo: 5,
    },
    {
      id: 4,
      paciente: "Ana Oliveira",
      diagnostico: "G93.1 - Lesão cerebral",
      score: 88,
      unidade: "Neurologia",
      custo: 32000,
      tempo: 9,
    },
    {
      id: 5,
      paciente: "Carlos Lima",
      diagnostico: "J44.1 - DPOC",
      score: 75,
      unidade: "Pneumologia",
      custo: 22000,
      tempo: 6,
    },
    {
      id: 6,
      paciente: "Lucia Ferreira",
      diagnostico: "N18.6 - DRC",
      score: 80,
      unidade: "Nefrologia",
      custo: 28000,
      tempo: 8,
    },
    {
      id: 7,
      paciente: "Roberto Alves",
      diagnostico: "E11.9 - Diabetes",
      score: 70,
      unidade: "Endocrinologia",
      custo: 15000,
      tempo: 4,
    },
    {
      id: 8,
      paciente: "Sandra Rocha",
      diagnostico: "I50.9 - ICC",
      score: 85,
      unidade: "Cardiologia",
      custo: 30000,
      tempo: 10,
    },
  ],
}
