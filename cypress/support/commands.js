
Cypress.Commands.add('buscaCEP', (cep) => {
    // Não transformei esse get em comandp personalizado, pois é um comando curto e simples, leva-lo para um comando, apenas diminuiria a performance.
    cy.get('[id="relaxation"]')
        .clear()
        .type(cep)

    cy.get('[action="https://buscacepinter.correios.com.br/app/endereco/index.php?t"]')
        // Tive q remover este atributo para que nao abra uma nova pagina, pois o cypress nao tem suporte para multiplas paginas
        .invoke('removeAttr', 'target')
        .find('[class="ic-busca-out"]')
        .click()
})
