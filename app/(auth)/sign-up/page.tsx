"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/lib/context/AuthContext";
import { AppDispatch, selector } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { createUserWithGoogleProvider, getCurrentUser } from "@/lib/appwrite/api";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { checkAuthUser, } = useUserContext();
  const { user, isAuthenticated, isLoading } = selector((state) => state.auth);
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  
  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();
  
  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);
      
      if (!newUser) {
        toast({ title: "Failed to create new user. Please try again.", });
        return;
      }
      console.log(newUser)
      const session = await signInAccount({
        email: user.email, 
        password: user.password,
      });
      console.log('session =  '+session)
      if (!session) {
        toast({ title: "Failed to create session. Please login your new account", });
        return;
      }
      
      checkAuthUser();
      if (isAuthenticated) {
        form.reset();
        router.push("/");
      } else {
        toast({ title: "Failed to create account. Please try again.", });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <Image
         src="/assets/images/logo.svg" 
         alt="logo"
         width={100}
         height={100}
        />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Clevery, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Button onClick={()=>createUserWithGoogleProvider()}
           className="shad-button_primary flex flex-row gap-4"
          >
            <FaGoogle/>
            Google
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
