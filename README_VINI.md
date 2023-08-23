# Hotkeys
[CTRL+SHIFT+F] = "procura em todos os arquivos"
[CTRL+SHIFT+P] = "abre o terminal"
[CTRL+CLICK] = "vai para a instância"
[Código_cadastro_administrador] = "300"


# ALTERAÇÕES EM FRONT OU BACK:
[FRONT]
src\app\features\XXXX\XXXX.component.html
src\app\features\XXXX\XXXX.component.ts

`strings do mongodb`
src\app\models\usuario-dto.ts [Usuário_Comum]
src\app\shared\models\usuario-academia.dto.ts [Usuário_Administrador]

`Verificar se necessita alteração em edit-. Exemplo, edit-usuario ou edit-equipamento`

[Printar_Front]
1. Adicionar a TAG da variavel no arquivo HTML ex: {{cargoUsuario}},

2. Na 'export class' do arquivo component.ts: ,
    - Adicionar a variável "cargoUsuario" abaixo das demais.
    - Em 'ngOnInit()' manipular a variável atribuindo a ela o valor do banco.
    - this.variavel = usuario.nivelADM,
    - Se quiser alterar o valor, fazer um switch case.



[BACK]
src\app\modules\XXXX\dto\XXXX.dto.ts
src\app\modules\XXXX\entity\XXXX.interface.ts
src\app\modules\XXXX\entity\XXXX.schema.ts
src\app\modules\usuario-academia\dto\usuario-academia.dto.ts
src\app\modules\usuario-academia\entity\usuario-academia.interface.ts
src\app\modules\usuario-academia\entity\usuario-academia.schema.ts
`REINICIAR TERMINAR DO BACK PARA FUNCIONAR!!!!`

