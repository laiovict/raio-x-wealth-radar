export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      fixed_income: {
        Row: {
          advisor_code: number | null
          applied_value: number | null
          asset: string | null
          available: number | null
          created_at: string | null
          current_value: number | null
          emitter: string | null
          external_product_id: number | null
          fixed_income_type: string | null
          gross_income: number | null
          gross_value: number | null
          history_id: number
          interest: string | null
          investor_account_on_brokerage_house: number | null
          iof: string | null
          ir: string | null
          lack_date: string | null
          last_apply: string | null
          liquid_income: number | null
          liquid_value: number | null
          liquidity: string | null
          maturity_date: string | null
          paper: string | null
          price: number | null
          price_date: string | null
          product: string | null
          quantity: number | null
          rating: string | null
          start_date: string | null
          tax: string | null
          warranty: string | null
        }
        Insert: {
          advisor_code?: number | null
          applied_value?: number | null
          asset?: string | null
          available?: number | null
          created_at?: string | null
          current_value?: number | null
          emitter?: string | null
          external_product_id?: number | null
          fixed_income_type?: string | null
          gross_income?: number | null
          gross_value?: number | null
          history_id: number
          interest?: string | null
          investor_account_on_brokerage_house?: number | null
          iof?: string | null
          ir?: string | null
          lack_date?: string | null
          last_apply?: string | null
          liquid_income?: number | null
          liquid_value?: number | null
          liquidity?: string | null
          maturity_date?: string | null
          paper?: string | null
          price?: number | null
          price_date?: string | null
          product?: string | null
          quantity?: number | null
          rating?: string | null
          start_date?: string | null
          tax?: string | null
          warranty?: string | null
        }
        Update: {
          advisor_code?: number | null
          applied_value?: number | null
          asset?: string | null
          available?: number | null
          created_at?: string | null
          current_value?: number | null
          emitter?: string | null
          external_product_id?: number | null
          fixed_income_type?: string | null
          gross_income?: number | null
          gross_value?: number | null
          history_id?: number
          interest?: string | null
          investor_account_on_brokerage_house?: number | null
          iof?: string | null
          ir?: string | null
          lack_date?: string | null
          last_apply?: string | null
          liquid_income?: number | null
          liquid_value?: number | null
          liquidity?: string | null
          maturity_date?: string | null
          paper?: string | null
          price?: number | null
          price_date?: string | null
          product?: string | null
          quantity?: number | null
          rating?: string | null
          start_date?: string | null
          tax?: string | null
          warranty?: string | null
        }
        Relationships: []
      }
      investment_funds: {
        Row: {
          advisor_code: number | null
          created_at: string | null
          external_id: string | null
          fund_code: number | null
          fund_id: number | null
          gross_income: number | null
          gross_value: number | null
          history_id: number
          investment_fund_type: string | null
          investor_account_on_brokerage_house: number | null
          iof: string | null
          ir: number | null
          is_processing: string | null
          liquid_income: number | null
          liquid_value: number | null
          position: number | null
          product: string | null
          quota_amount: number | null
          quota_date: string | null
          quota_value: number | null
          quotation_value: string | null
          withdrawal_blocked: string | null
          withdrawal_liquid: string | null
          withdrawal_quota: string | null
        }
        Insert: {
          advisor_code?: number | null
          created_at?: string | null
          external_id?: string | null
          fund_code?: number | null
          fund_id?: number | null
          gross_income?: number | null
          gross_value?: number | null
          history_id: number
          investment_fund_type?: string | null
          investor_account_on_brokerage_house?: number | null
          iof?: string | null
          ir?: number | null
          is_processing?: string | null
          liquid_income?: number | null
          liquid_value?: number | null
          position?: number | null
          product?: string | null
          quota_amount?: number | null
          quota_date?: string | null
          quota_value?: number | null
          quotation_value?: string | null
          withdrawal_blocked?: string | null
          withdrawal_liquid?: string | null
          withdrawal_quota?: string | null
        }
        Update: {
          advisor_code?: number | null
          created_at?: string | null
          external_id?: string | null
          fund_code?: number | null
          fund_id?: number | null
          gross_income?: number | null
          gross_value?: number | null
          history_id?: number
          investment_fund_type?: string | null
          investor_account_on_brokerage_house?: number | null
          iof?: string | null
          ir?: number | null
          is_processing?: string | null
          liquid_income?: number | null
          liquid_value?: number | null
          position?: number | null
          product?: string | null
          quota_amount?: number | null
          quota_date?: string | null
          quota_value?: number | null
          quotation_value?: string | null
          withdrawal_blocked?: string | null
          withdrawal_liquid?: string | null
          withdrawal_quota?: string | null
        }
        Relationships: []
      }
      investor_portfolio_summary: {
        Row: {
          coe_representation: string | null
          coe_value: string | null
          created_at: string | null
          fixed_income_representation: number | null
          fixed_income_value: number | null
          imported_at: string | null
          investment_fund_representation: number | null
          investment_fund_value: number | null
          investment_international_representation: string | null
          investment_international_value: string | null
          investor_account_on_brokerage_house: number
          private_pension_representation: number | null
          private_pension_value: number | null
          real_estate_representation: number | null
          real_estate_value: number | null
          stocks_representation: string | null
          stocks_value: string | null
          total_balance: string | null
          total_balance_representation: string | null
          total_portfolio_value: string | null
          treasure_representation: string | null
          treasure_value: string | null
          updated_at: string | null
        }
        Insert: {
          coe_representation?: string | null
          coe_value?: string | null
          created_at?: string | null
          fixed_income_representation?: number | null
          fixed_income_value?: number | null
          imported_at?: string | null
          investment_fund_representation?: number | null
          investment_fund_value?: number | null
          investment_international_representation?: string | null
          investment_international_value?: string | null
          investor_account_on_brokerage_house: number
          private_pension_representation?: number | null
          private_pension_value?: number | null
          real_estate_representation?: number | null
          real_estate_value?: number | null
          stocks_representation?: string | null
          stocks_value?: string | null
          total_balance?: string | null
          total_balance_representation?: string | null
          total_portfolio_value?: string | null
          treasure_representation?: string | null
          treasure_value?: string | null
          updated_at?: string | null
        }
        Update: {
          coe_representation?: string | null
          coe_value?: string | null
          created_at?: string | null
          fixed_income_representation?: number | null
          fixed_income_value?: number | null
          imported_at?: string | null
          investment_fund_representation?: number | null
          investment_fund_value?: number | null
          investment_international_representation?: string | null
          investment_international_value?: string | null
          investor_account_on_brokerage_house?: number
          private_pension_representation?: number | null
          private_pension_value?: number | null
          real_estate_representation?: number | null
          real_estate_value?: number | null
          stocks_representation?: string | null
          stocks_value?: string | null
          total_balance?: string | null
          total_balance_representation?: string | null
          total_portfolio_value?: string | null
          treasure_representation?: string | null
          treasure_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      investors_summaries: {
        Row: {
          created_at: string | null
          investor_account_on_brokerage_house: number | null
          investor_copilotu_id: string | null
          investor_name: string | null
          summary: string | null
          summary_id: number
          tags: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          investor_account_on_brokerage_house?: number | null
          investor_copilotu_id?: string | null
          investor_name?: string | null
          summary?: string | null
          summary_id: number
          tags?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          investor_account_on_brokerage_house?: number | null
          investor_copilotu_id?: string | null
          investor_name?: string | null
          summary?: string | null
          summary_id?: number
          tags?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      open_finance_investments: {
        Row: {
          amount_original: number | null
          asset_subtype: string | null
          asset_type: string
          book_amount: number
          code: string
          created_at: string
          currency_code: string
          due_date: string | null
          fixed_annual_rate: number | null
          id: string
          issue_date: string | null
          issuer_json: Json | null
          item_id: string
          last_quote_date: string
          metadata_json: Json | null
          name: string
          quantity: number
          rate: number | null
          rate_type: string | null
          status: string
          taxes_json: Json | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          amount_original?: number | null
          asset_subtype?: string | null
          asset_type: string
          book_amount: number
          code: string
          created_at?: string
          currency_code?: string
          due_date?: string | null
          fixed_annual_rate?: number | null
          id?: string
          issue_date?: string | null
          issuer_json?: Json | null
          item_id: string
          last_quote_date: string
          metadata_json?: Json | null
          name: string
          quantity: number
          rate?: number | null
          rate_type?: string | null
          status: string
          taxes_json?: Json | null
          unit_price: number
          updated_at?: string
        }
        Update: {
          amount_original?: number | null
          asset_subtype?: string | null
          asset_type?: string
          book_amount?: number
          code?: string
          created_at?: string
          currency_code?: string
          due_date?: string | null
          fixed_annual_rate?: number | null
          id?: string
          issue_date?: string | null
          issuer_json?: Json | null
          item_id?: string
          last_quote_date?: string
          metadata_json?: Json | null
          name?: string
          quantity?: number
          rate?: number | null
          rate_type?: string | null
          status?: string
          taxes_json?: Json | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      open_finance_transactions: {
        Row: {
          account_id: string
          acquirer_data_json: Json | null
          amount: number
          amount_in_acct_curr: number | null
          category: string | null
          category_id: string | null
          created_at: string
          credit_card_metadata_json: Json | null
          currency_code: string
          description: string
          description_raw: string
          id: string
          merchant_json: Json | null
          operation_type: string | null
          payment_data_json: Json | null
          provider_id: string | null
          status: string
          transacted_at: string
          type: string
          updated_at: string
        }
        Insert: {
          account_id: string
          acquirer_data_json?: Json | null
          amount: number
          amount_in_acct_curr?: number | null
          category?: string | null
          category_id?: string | null
          created_at?: string
          credit_card_metadata_json?: Json | null
          currency_code?: string
          description: string
          description_raw: string
          id?: string
          merchant_json?: Json | null
          operation_type?: string | null
          payment_data_json?: Json | null
          provider_id?: string | null
          status: string
          transacted_at: string
          type: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          acquirer_data_json?: Json | null
          amount?: number
          amount_in_acct_curr?: number | null
          category?: string | null
          category_id?: string | null
          created_at?: string
          credit_card_metadata_json?: Json | null
          currency_code?: string
          description?: string
          description_raw?: string
          id?: string
          merchant_json?: Json | null
          operation_type?: string | null
          payment_data_json?: Json | null
          provider_id?: string | null
          status?: string
          transacted_at?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_earnings_history: {
        Row: {
          advisor_code: number | null
          asset: string | null
          created_at: string | null
          id: number
          imported_at: string | null
          investor_account_on_brokerage_house: number | null
          payment_date: string | null
          quantity: string | null
          type: string | null
          value: string | null
        }
        Insert: {
          advisor_code?: number | null
          asset?: string | null
          created_at?: string | null
          id: number
          imported_at?: string | null
          investor_account_on_brokerage_house?: number | null
          payment_date?: string | null
          quantity?: string | null
          type?: string | null
          value?: string | null
        }
        Update: {
          advisor_code?: number | null
          asset?: string | null
          created_at?: string | null
          id?: number
          imported_at?: string | null
          investor_account_on_brokerage_house?: number | null
          payment_date?: string | null
          quantity?: string | null
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profitability_ytd: {
        Row: {
          advisor_code: number | null
          created_at: string | null
          history_id: number | null
          id: number
          investor_account_on_brokerage_house: number | null
          six_months: number | null
          thirty_six_months: number | null
          twelve_months: number | null
          twenty_four_months: number | null
          ytd: number | null
        }
        Insert: {
          advisor_code?: number | null
          created_at?: string | null
          history_id?: number | null
          id: number
          investor_account_on_brokerage_house?: number | null
          six_months?: number | null
          thirty_six_months?: number | null
          twelve_months?: number | null
          twenty_four_months?: number | null
          ytd?: number | null
        }
        Update: {
          advisor_code?: number | null
          created_at?: string | null
          history_id?: number | null
          id?: number
          investor_account_on_brokerage_house?: number | null
          six_months?: number | null
          thirty_six_months?: number | null
          twelve_months?: number | null
          twenty_four_months?: number | null
          ytd?: number | null
        }
        Relationships: []
      }
      real_estate: {
        Row: {
          advisor_code: number | null
          asset: string | null
          average_price: number | null
          average_price_status: string | null
          blocked_quantity: string | null
          created_at: string | null
          history_id: number
          investor_account_on_brokerage_house: number | null
          last_price: number | null
          performance: number | null
          quantity: number | null
          quantity_available: number | null
          quantity_day: string | null
          quantity_designed: string | null
          total_value: number | null
        }
        Insert: {
          advisor_code?: number | null
          asset?: string | null
          average_price?: number | null
          average_price_status?: string | null
          blocked_quantity?: string | null
          created_at?: string | null
          history_id: number
          investor_account_on_brokerage_house?: number | null
          last_price?: number | null
          performance?: number | null
          quantity?: number | null
          quantity_available?: number | null
          quantity_day?: string | null
          quantity_designed?: string | null
          total_value?: number | null
        }
        Update: {
          advisor_code?: number | null
          asset?: string | null
          average_price?: number | null
          average_price_status?: string | null
          blocked_quantity?: string | null
          created_at?: string | null
          history_id?: number
          investor_account_on_brokerage_house?: number | null
          last_price?: number | null
          performance?: number | null
          quantity?: number | null
          quantity_available?: number | null
          quantity_day?: string | null
          quantity_designed?: string | null
          total_value?: number | null
        }
        Relationships: []
      }
      section_feedback: {
        Row: {
          created_at: string
          id: string
          section_id: string
          updated_at: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_id: string
          updated_at?: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          section_id?: string
          updated_at?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: []
      }
      stocks: {
        Row: {
          advisor_code: number | null
          asset: string | null
          available: string | null
          average_price: string | null
          average_price_status: string | null
          created_at: string | null
          history_id: number
          investor_account_on_brokerage_house: number | null
          performance: string | null
          price: number | null
          quantity: string | null
          quantity_blocked: string | null
          quantity_day: string | null
          quantity_projected: string | null
          quantity_structured: string | null
          total_value: string | null
          warranty_boc: string | null
          warranty_bvmf: string | null
          yield: string | null
        }
        Insert: {
          advisor_code?: number | null
          asset?: string | null
          available?: string | null
          average_price?: string | null
          average_price_status?: string | null
          created_at?: string | null
          history_id: number
          investor_account_on_brokerage_house?: number | null
          performance?: string | null
          price?: number | null
          quantity?: string | null
          quantity_blocked?: string | null
          quantity_day?: string | null
          quantity_projected?: string | null
          quantity_structured?: string | null
          total_value?: string | null
          warranty_boc?: string | null
          warranty_bvmf?: string | null
          yield?: string | null
        }
        Update: {
          advisor_code?: number | null
          asset?: string | null
          available?: string | null
          average_price?: string | null
          average_price_status?: string | null
          created_at?: string | null
          history_id?: number
          investor_account_on_brokerage_house?: number | null
          performance?: string | null
          price?: number | null
          quantity?: string | null
          quantity_blocked?: string | null
          quantity_day?: string | null
          quantity_projected?: string | null
          quantity_structured?: string | null
          total_value?: string | null
          warranty_boc?: string | null
          warranty_bvmf?: string | null
          yield?: string | null
        }
        Relationships: []
      }
      treasure: {
        Row: {
          advisor_code: number | null
          available: number | null
          created_at: string | null
          due_date: string | null
          history_id: number
          investor_account_on_brokerage_house: number | null
          last_quote: number | null
          position: number | null
          product_id: string | null
          quantity: number | null
          title: string | null
          treasure_type: string | null
          type: string | null
          warranty: string | null
        }
        Insert: {
          advisor_code?: number | null
          available?: number | null
          created_at?: string | null
          due_date?: string | null
          history_id: number
          investor_account_on_brokerage_house?: number | null
          last_quote?: number | null
          position?: number | null
          product_id?: string | null
          quantity?: number | null
          title?: string | null
          treasure_type?: string | null
          type?: string | null
          warranty?: string | null
        }
        Update: {
          advisor_code?: number | null
          available?: number | null
          created_at?: string | null
          due_date?: string | null
          history_id?: number
          investor_account_on_brokerage_house?: number | null
          last_quote?: number | null
          position?: number | null
          product_id?: string | null
          quantity?: number | null
          title?: string | null
          treasure_type?: string | null
          type?: string | null
          warranty?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
