/// <reference types="cypress" />

context('Validando o site dos correios', () => {
    beforeEach(() => {
      cy.visit('https://www.correios.com.br')
    })
  
    it('Valida CEP e Rastreamento', () => {
        // Busca pelo CEP 80700000
        cy.buscaCEP(80700000)
        // Validate by ID
        cy.get('[id="mensagem-resultado-alerta"]').should("have.text", "Dados não encontrado")
        cy.go('back')



        // Busca pelo CEP 01013-001
        cy.buscaCEP("01013-001")
        // Validate by Xpatch
        cy.xpath('//td[@data-th="Logradouro/Nome"]').should("have.text", "Rua Quinze de Novembro - lado ímpar")
        cy.xpath('//td[@data-th="Localidade/UF"]').should("have.text", "São Paulo/SP")

        // Usei este comando para retornar para a pagina inicial, porém no dia a dia, eu separaria estes 3 cenarios em 3 its distintos
        cy.go('back')




        // Busca pelo Produto SS987654321BR
        // Este é o unico caso de busca por projetos, sendo assim, nao vi a necessidade de transformar isto em comando personalizado já que o teste também perderia performance.
         cy.get('[id="objetos"]').type("SS987654321BR")
         cy.get('[action="https://rastreamento.correios.com.br/app/index.php"]')
            .invoke('removeAttr', 'target')
            .find('[class="ic-busca-out"]')
            .click()
        // Neste caso, não foi poossivel validar  a mensagem de codigo inesistente, pois atualmente é nescessario passar pelo captcha.
        // Validate by cssSelector
        cy.get('label[for="captcha"]').should("have.text", "Digite o texto contido na imagem")
    })
  })
  