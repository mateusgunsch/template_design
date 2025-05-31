export interface ReinternacaoData {
  total_pacientes: number
  reinternacoes: number
  percentual: number
  meta: number
}

export interface AltaAntecipadaData {
  potencial_alta: number
  percentual: number
  meta: number
}

export interface InternacaoDomiciliarData {
  elegiveis: number
  percentual: number
  meta: number
}

export interface PermanenciaProlongadaData {
  casos: number
  percentual: number
  meta: number
}

export interface TempoMedioInternacaoData {
  previsto: number
  meta: number
}

export interface EvolucaoMensalData {
  mes: string
  percentual: number
}

export interface CustoMedioHospitalData {
  hospital: string
  previsto: number
  real: number
  eficiencia_percentual: number
}

export interface CustoTotalMensalData {
  mes: string
  previsto: number
  real: number
  desvio_percentual: number
}

export interface EficienciaAjustadaData {
  hospital: string
  eficiencia: number
}

export interface DistribuicaoCustosData {
  tipo: string
  percentual: number
}

export interface InternacaoAltoCustoData {
  cid: string
  percentual: number
}

export interface EventosAdversosData {
  tipo: string
  percentual: number
}

export interface CriticidadeCIDData {
  cid: string
  criticidade_alta_percentual: number
}

export interface DesvioFaturamentoData {
  hospital: string
  previsto: number
  real: number
  anomalia_percentual: number
}

export interface TiposAnomaliaData {
  tipo: string
  percentual: number
}

export interface EvolucaoDesviosData {
  mes: string
  percentual: number
}

export interface DashboardData {
  eficiencia_assistencial: {
    reinternacao_30_dias: ReinternacaoData
    alta_antecipada: AltaAntecipadaData
    internacao_domiciliar: InternacaoDomiciliarData
    permanencia_prolongada: PermanenciaProlongadaData
    tempo_medio_internacao: TempoMedioInternacaoData
    evolucao_mensal_permanencia: EvolucaoMensalData[]
  }
  gestao_de_custos: {
    custo_medio_por_hospital: CustoMedioHospitalData[]
    custo_total_mensal: CustoTotalMensalData[]
    eficiencia_ajustada_case_mix: EficienciaAjustadaData[]
    distribuicao_custos_por_tipo: DistribuicaoCustosData[]
  }
  gestao_de_riscos: {
    internacoes_alto_custo_por_cid: InternacaoAltoCustoData[]
    eventos_adversos: EventosAdversosData[]
    criticidade_por_cid: CriticidadeCIDData[]
  }
  auditoria_e_compliance: {
    desvio_faturamento_por_hospital: DesvioFaturamentoData[]
    tipos_de_anomalias: TiposAnomaliaData[]
    evolucao_desvios_faturamento: EvolucaoDesviosData[]
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  phone?: string
}
