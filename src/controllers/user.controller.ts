import {
  BadRequestException,
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { SupabaseService } from '../services/supabase.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Cria usuário no Supabase Auth, enviando name, cpf e email como metadados
    const { email, password, name, cpf } = createUserDto;
    const { data, error } = await this.supabaseService.signUp(email, password, {
      name,
      cpf,
      email,
    });
    if (error?.message) {
      throw new BadRequestException(error.message);
    }
    if (error) {
      throw new BadRequestException('Falha ao cadastrar usuário');
    }
    return data;
  }

  @Post('/login')
  async login(@Body() login: LoginUserDto) {
    const { email, password } = login;
    const { data, error } = await this.supabaseService.signIn(email, password);
    if (error?.message) {
      throw new BadRequestException(error.message);
    }
    if (error) {
      throw new BadRequestException('Credenciais inválidas');
    }
    return data;
  }

  @Post('/auth/google')
  async googleAuth() {
    const { data, error } = await this.supabaseService.signInWithGoogle();
    if (error?.message) {
      throw new BadRequestException(error.message);
    }
    if (error) {
      throw new BadRequestException('Erro ao autenticar com Google');
    }
    return data;
  }

  @Post('/auth/google/token')
  async googleTokenAuth(@Body() body: { token: string; nonce?: string }) {
    const { data, error } = await this.supabaseService.signInWithIdToken(
      body.token,
      body.nonce,
    );
    if (error?.message) {
      throw new BadRequestException(error.message);
    }
    if (error) {
      throw new BadRequestException('Token do Google inválido');
    }
    return data;
  }

  @Get('/auth/callback')
  async authCallback() {
    return {
      message: 'Login com Google realizado com sucesso!',
      info: 'Em produção, aqui você processaria o callback e redirecionaria o usuário',
    };
  }
}
