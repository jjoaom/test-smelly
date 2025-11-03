const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
};

describe('UserService - Suíte de Testes com Smells', () => {
  let userService;

  // O setup é executado antes de cada teste
  beforeEach(() => {
    userService = new UserService();
    userService._clearDB(); // Limpa o "banco" para cada teste
  });

  test('deve criar um usuário corretamente', () => {
    // Act 1: Criar
    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );

    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(dadosUsuarioPadrao.nome);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve buscar um usuário corretamente', () => {
    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );

    const usuarioBuscado = userService.getUserById(usuarioCriado.id);
    expect(usuarioBuscado).toEqual(usuarioCriado);
  });

  test('deve desativar usuários se eles não forem administradores', () => {
    const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30);

    const resultado = userService.deactivateUser(usuarioComum.id);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);

    expect(resultado).toBe(true);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('nao deve desativar usuários se eles não forem administradores', () => {
    const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

    const resultado = userService.deactivateUser(usuarioAdmin.id);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

    expect(resultado).toBe(false);
    expect(usuarioAtualizado.status).toBe('ativo');
  });

  test('deve gerar um relatório de usuários formatado', () => {
    const usuario1 = userService.createUser('Alice', 'alice@email.com', 28);
    const usuario2 = userService.createUser('Bob', 'bob@email.com', 32);

    const relatorio = userService.generateUserReport();

    expect(relatorio).toMatch(/--- Relatório de Usuários ---/);
    expect(relatorio).toContain(`ID: ${usuario1.id}, Nome: Alice`);
    expect(relatorio).toContain(`ID: ${usuario2.id}, Nome: Bob`);
  });

  test('deve falhar ao criar usuário menor de idade', () => {
    // Este teste não falha se a exceção NÃO for lançada.
    // Ele só passa se o `catch` for executado. Se a lógica de validação
    // for removida, o teste passa silenciosamente, escondendo um bug.
    expect(() => {
      userService.createUser('Menor', 'menor@email.com', 17);
    }).toThrow('O usuário deve ser maior de idade.');
  });

test('deve retornar uma lista vazia quando não há usuários', () => {
  userService._clearDB(); // garante que o banco esteja vazio

  const relatorio = userService.generateUserReport();

  expect(relatorio).toMatch(/--- Relatório de Usuários ---/);
  expect(relatorio).toContain('Nenhum usuário cadastrado.');
  });

});