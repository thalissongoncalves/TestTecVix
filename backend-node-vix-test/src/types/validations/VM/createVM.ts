import { z } from "zod";

const EVMLocation = z.enum(["USA_MIAMI", "BRA_SAO_PAULO"]);
const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
const EVMNetwork = z.enum(["public", "public_private", "private" ]);
// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().min(3),
  pass: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .refine((val) => passwordRegex.numbers.test(val), {
      message: "Password must contain at least 2 numbers",
    })
    .refine((val) => passwordRegex.lowercase.test(val), {
      message: "Password must contain at least 2 lowercase letters",
    })
    .refine((val) => passwordRegex.uppercase.test(val), {
      message: "Password must contain at least 2 uppercase letters",
    })
    .refine((val) => passwordRegex.special.test(val), {
      message: "Password must contain at least 2 special characters",
    }),
  location: z.enum(["USA_MIAMI", "BRA_SAO_PAULO"]),
  os: z.string(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  networkType: EVMNetwork.optional().default("public"),
  hasBackup: z.boolean().optional().default(false),
  status: EVMStatus.optional(),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
