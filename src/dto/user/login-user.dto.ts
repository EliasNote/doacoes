import { IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos numéricos',
  })
  readonly cpf: string;

  @IsString()
  readonly password: string;
}
