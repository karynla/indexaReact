import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <button className="back-btn-about" onClick={() => navigate("/")}>
          ← Voltar
        </button>
        <div className="header">
          <div className="header-text">
            <div>
              <img src="indexaIcon.png" alt="logo indexa" width="80px" />
              <h1>Indexa - Prontuários SOAP </h1>
              <p className="subtitle">
                Gerenciamento de Pacientes e Prontuários
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Gestão Profissional de Prontuários Médicos</h2>
          <p className="hero-description">
            Uma solução completa e intuitiva para médicos gerenciarem pacientes
            e registros clínicos de forma padronizada, estruturada pelo método
            SOAP.
          </p>
          <button className="btn-cta" onClick={() => navigate("/")}>
            Começar Agora →
          </button>
        </div>
      </section>

      {/* O que é SOAP */}
      <section className="soap-explanation">
        <h2>O Método SOAP</h2>
        <p className="section-intro">
          Estrutura padronizada internacionalmente para documentação clínica
        </p>
        <div className="soap-grid">
          <div className="soap-card">
            <div className="soap-icon">S</div>
            <h3>Subjetivo</h3>
            <p>
              Sintomas relatados pelo paciente, queixa principal e história da
              doença atual
            </p>
          </div>
          <div className="soap-card">
            <div className="soap-icon">O</div>
            <h3>Objetivo</h3>
            <p>
              Achados do exame físico: PA, FC, temperatura, ausculta e sinais
              vitais
            </p>
          </div>
          <div className="soap-card">
            <div className="soap-icon">A</div>
            <h3>Avaliação</h3>
            <p>
              Diagnóstico clínico, hipóteses diagnósticas e impressão médica
            </p>
          </div>
          <div className="soap-card">
            <div className="soap-icon">P</div>
            <h3>Plano</h3>
            <p>
              Conduta terapêutica, prescrições médicas e orientações ao paciente
            </p>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="features-section">
        <h2>Funcionalidades Principais</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Gestão de Pacientes</h3>
            <p>
              Cadastre e gerencie sua base de pacientes com informações
              completas: dados pessoais, histórico e estatísticas
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Prontuários Estruturados</h3>
            <p>
              Registre atendimentos com o método SOAP, garantindo padronização e
              qualidade nos registros clínicos
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Busca Inteligente</h3>
            <p>
              Encontre pacientes rapidamente com busca em tempo real por nome
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Histórico Completo</h3>
            <p>
              Acesse todo o histórico de atendimentos e evolução clínica de cada
              paciente
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Edição Facilitada</h3>
            <p>
              Edite informações de pacientes e prontuários de forma rápida e
              segura
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Segurança</h3>
            <p>
              Confirmações de exclusão e proteção de dados sensíveis dos
              pacientes
            </p>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="use-cases-section">
        <h2>Casos de Uso</h2>
        <div className="use-cases-grid">
          <div className="use-case-card">
            <h3>Médicos e Clínicos</h3>
            <ul>
              <li>✓ Registrar atendimentos estruturados</li>
              <li>✓ Manter histórico organizado de pacientes</li>
              <li>✓ Consultar diagnósticos e evoluções passadas</li>
              <li>✓ Planejar e documentar tratamentos</li>
            </ul>
          </div>
          <div className="use-case-card">
            <h3>Clínicas e Consultórios</h3>
            <ul>
              <li>✓ Gerenciar base completa de pacientes</li>
              <li>✓ Padronizar registros clínicos da equipe</li>
              <li>✓ Facilitar transição entre profissionais</li>
              <li>✓ Conformidade com documentação médica</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="benefits-section">
        <h2>Por que Escolher a Indexa?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-number">01</span>
            <div className="benefit-content">
              <h3>Interface Intuitiva</h3>
              <p>
                Design moderno e fácil de usar, sem necessidade de treinamento
                extensivo
              </p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">02</span>
            <div className="benefit-content">
              <h3>Padronização Internacional</h3>
              <p>
                Método SOAP reconhecido mundialmente para documentação clínica
              </p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">03</span>
            <div className="benefit-content">
              <h3>Agilidade no Atendimento</h3>
              <p>
                Acesso rápido a informações, permitindo mais tempo com o
                paciente
              </p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">04</span>
            <div className="benefit-content">
              <h3>Organização Profissional</h3>
              <p>
                Todos os registros centralizados e organizados de forma lógica
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologia */}
      <section className="tech-section">
        <h2>Tecnologia</h2>
        <p className="tech-intro">
          Desenvolvida com tecnologias modernas e confiáveis
        </p>
        <div className="tech-badges">
          <span className="tech-badge">React 18</span>
          <span className="tech-badge">Vite</span>
          <span className="tech-badge">React Router</span>
          <span className="tech-badge">RESTful API</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>Desenvolvido para profissionais de saúde</p>
        <p className="footer-subtitle">
          © 2026 Indexa - Sistema de Prontuários Médicos
        </p>
      </footer>
    </div>
  );
}
